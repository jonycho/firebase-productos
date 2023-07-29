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
        navigate("/firebase-productos/mostrar")
    }


    return (
        <div className='container mt-2' style={{height:"80vh"}}>
        <div className='row'>
             <div className='col'>

             <h2 className='mt-3 text-dark titulo-editar'>Crear Producto Nuevo</h2>

             <form onSubmit={nuevo} className='mt-5 '>
                <div className='mb-4 d-flex justify-content-between'>
                    <label className='form-label h5 text-dark'>Modelo:</label>
                    <input 
                        value={modelo}
                        type="text"
                        className='form-control w-50'
                        onChange={(e)=>setModelo(e.target.value)}
                        required
                    />
                </div>

                <div className='mb-4 d-flex justify-content-between'>
                <label className='form-label h5 text-dark'>Precio:</label>
                <div className="input-group mb-3 w-50">
                        <span className="input-group-text">$</span>
                        <input
                            value={precio}
                            type="text"
                            className='form-control'
                            onChange={(e)=>setPrecio(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='mb-4 d-flex justify-content-between'>
                <label className='form-label h5 text-dark'>Stock:</label>
                <select value={stock} onChange={(e)=>setStock(e.target.value)} className="form-select w-50" aria-label="Default select example">
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                <label className='form-label h5 text-dark'>Subir imagen</label>
                <input onChange={(e)=>setUrlImagen(e.target.files[0])} className="form-control w-50" type="file" />
                </div>

                <button type="submit" className='btn btn-outline-dark btn-lg mt-3'>Agregar</button>
             
             </form>
             </div>
        </div>
    </div>
    );
}

export default Crear;
