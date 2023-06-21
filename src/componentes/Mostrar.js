import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {collection, getDocs,getDoc, deleteDoc, doc} from 'firebase/firestore';
import { db, deleteFiles } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import {async} from '@firebase/util';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Mostrar = () => {

    //1 Configuracion de estados

    const [productos, setProductos] = useState([])

    //2 referenciar a la db de firebase

    const productosCollection = collection(db, "Celulares")

    //3 asincronismo a los datos

    const getProductos  = async () => {
        const data = await getDocs(productosCollection)
        //console.log(data.docs)
        
        setProductos(
            data.docs.map(doc => ({...doc.data(), id:doc.id}))
        )
    }

    //4 delete documento
    const deleteProducto = async (id) =>{
        const productoDoc =  doc(db, "Celulares", id)
        const productoSel = await getDoc(productoDoc)
        await deleteFiles(productoSel.data().Modelo)
        await deleteDoc(productoDoc)
        getProductos()
    } 

    
    //5 configuracion del sweet alert
    const confirmDelete = (id)=>{
        Swal.fire({
        title: '¿Está seguro de borrar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteProducto(id)
          Swal.fire(
            'Borrado',
                'El producto fue eliminado.',
                'success'
          )
        }
      })
    }
    //6 definicion de useEffect

    useEffect(() => {
        getProductos()
    }, []);



    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    <Link to="/firebase-productos/crearproducto" className='btn btn-dark btn-lg mt-3 mb-4 w-25' >Crear Nuevo Producto  <i className="fa-solid fa-plus"></i></Link>
                </div>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Modelo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='text-light'>
                        { productos.map((produc)=>(
                            <tr key={produc.id}>
                                <td key={produc.Imagen} className='text-light'>{
                                    produc.Imagen ?
                                        <img width={75} src={produc.Imagen} alt={produc.Modelo} /> 
                                    : ''}
                                </td>
                                <td key={produc.Modelo} className='text-light'>{produc.Modelo || ''}</td>
                                <td key={produc.Precio} className='text-light'>$ {produc.Precio || ''}</td>
                                <td key={produc.Stock} className='text-light'>{produc.Stock ? "si": "no" || ''} </td>
                                <td>
                                    <Link to={`/firebase-productos/editarproducto/${produc.id}`} className="btn btn-light me-2"><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button onClick={()=>{confirmDelete(produc.id)}} className="btn btn-danger"><i className="fa-solid fa-trash "></i></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default Mostrar;
