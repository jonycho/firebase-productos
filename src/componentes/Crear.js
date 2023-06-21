import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {collection, addDoc} from 'firebase/firestore';
import { db, uploadFiles } from '../firebaseConfig/firebase';

import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Crear = () => {

    //1 creacion de estados

    const [modelo, setModelo] = useState("")
    const [urlimagen, setUrlImagen] = useState("")
    const [precio, setPrecio] = useState("")
    const [stock, setStock] = useState(false)
    const navigate = useNavigate()

    //2 referenciar la db
    const productosCollection = collection(db, "Celulares")

    //3 crear el alert

    const alertCreacion = ()=>{
        Swal.fire({
            icon: 'success',
            title: 'Se ha añadido el producto',
            showConfirmButton: false,
            timer: 1500
          })
    }


    //4 asincronismo con la db

    const nuevo = async (e)=>{
        e.preventDefault()
        try{
            //subo el archivo con el nombre del modelo y obtengo la url que se guarda en result
            const result = await uploadFiles(urlimagen, modelo)
            await addDoc(productosCollection, {
                Modelo: modelo,
                Precio: precio,
                Imagen: result,
                Stock: stock === "true" ? true : false 
            })
        }
        catch(error){
            console.error(error)
        }
        
        alertCreacion()
        navigate("/firebase-productos")
    }


    return (
        <div className='container'>
        <div className='row'>
             <div className='col'>

             <h1 className='mt-3 text-light'>Crear Producto Nuevo</h1>

             <form onSubmit={nuevo} className='mt-5 '>
                <div className='mb-4'>
                    <label className='form-label h3 text-light'>Modelo:</label>
                    <input 
                        value={modelo}
                        type="text"
                        className='form-control w-50 m-auto '
                        onChange={(e)=>setModelo(e.target.value)}
                    />
                </div>

                <div className='mb-4'>
                <label className='form-label h3 text-light'>Precio:</label>
                <div className="input-group mb-3 w-50 m-auto">
                        <span className="input-group-text">$</span>
                        <input
                            value={precio}
                            type="text"
                            className='form-control'
                            onChange={(e)=>setPrecio(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mb-4'>
                <label className='form-label h3 text-light'>Stock:</label>
                <select value={stock} onChange={(e)=>setStock(e.target.value)} className="form-select w-50 m-auto" aria-label="Default select example">
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                </div>

                <div className="mb-3 w-50 m-auto">
                <label className='form-label h3 text-light'>Subir imagen</label>
                <input onChange={(e)=>setUrlImagen(e.target.files[0])} className="form-control" type="file" />
                </div>

                <button type="submit" className='btn btn-outline-light btn-lg mt-3'>Agregar</button>
             
             </form>
             </div>
        </div>
    </div>
    );
}

export default Crear;
