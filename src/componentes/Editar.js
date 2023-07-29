import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import { db, uploadFiles } from '../firebaseConfig/firebase';
import { dbCollections } from '../firebaseConfig/collections';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Editar = () => {

    //1 declarar los estados
    const [loading, setLoading]= useState(false)
    const [apretar, setApretar] = useState(false)
    const [urlimagen, setUrlImagen] = useState('')
    const [form, setForm] = useState({
        Modelo: '',
        Precio: '',
        Stock: false,
        Imagen: ''
    })

    const navigate = useNavigate()
    const {id} = useParams()

    //2 asignar los valores del form

    const cambio = (e)=>{
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        })
    }

   //3 alerta de guardado

   const alertaGuardado = ()=>{
    Swal.fire({
    title: 'Registro modificado y guardado',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
    });
}

//4 declaramos el función update

const update = async (e)=>{
    e.preventDefault();
    setApretar(true)
    const producto = doc(db, dbCollections.Celulares, id);
    const result = urlimagen ? await uploadFiles(urlimagen, form.Modelo) : form.Imagen
    const data = {
        Modelo: form.Modelo,
        Precio: form.Precio,
        Imagen: result,
        Stock: form.Stock === "true" ? true : false
    };
    await updateDoc(producto,data);
    alertaGuardado();
    navigate("/mostrar");
}

//5 asincronismo de existencia con la bd

const getProductoById = async (id) =>{
    const producto = await getDoc(doc(db, dbCollections.Celulares, id));
    console.log(producto.data());

    if (producto.exists()){
        setForm({
            Modelo: producto.data().Modelo,
            Precio: producto.data().Precio,
            Stock: producto.data().Stock,
            Imagen: producto.data().Imagen 
        });
        setLoading(true)
    }
    else{
        console.log("no existe");
    }
};

//6 useEffect

useEffect(()=>{
    getProductoById(id);
    
}, [id]) 



    return (
        <>
        {!loading ? 
        <div className='loading-icon'><img src="../imagenes/search.gif" alt='loading' /></div> :
        <div className='container mt-2' style={{height:"80vh"}}>
        <div className='row'>
             <div className='col'>

             <h2 className='mt-3 text-dark titulo-editar'>Editar el Producto</h2>

             <form onSubmit={update} className="mt-5">
                <div className='mb-4 d-flex justify-content-between'>
                    <label className='form-label h5 text-dark'>Modelo:</label>
                    <input 
                        name='Modelo'
                        value={form.Modelo}
                        type="text"
                        className='form-control w-50'
                        onChange={cambio}
                        required
                    />
                </div>

                <div className='mb-4 d-flex justify-content-between'>
                    <label className='form-label h5 text-dark'>Precio:</label>
                    <div className="input-group mb-3 w-50">
                        <span className="input-group-text">$</span>
                        <input
                            name="Precio"
                            value={form.Precio}
                            type="text"
                            className='form-control'
                            onChange={cambio}
                            required
                        />
                    </div>
                </div>

                <div className='mb-3 d-flex justify-content-between'>
                <label className='form-label h5 text-dark'>Stock:</label>
                <select name="Stock" value={form.Stock} onChange={cambio} className="form-select w-50">
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                </div>

                <div className="mb-4 d-flex justify-content-between">
                <label className='form-label h5 text-dark'>Subir imagen</label><br />
                {
                    form.Imagen ?
                        <img width={100} src={form.Imagen} alt={form.Modelo} /> 
                    : ''}
                <input name="Imagen" onChange={(e)=>setUrlImagen(e.target.files[0])} className="form-control mt-3 w-50" type="file" />
                </div>

                <button type="submit" disabled={apretar ? true : false} className='btn btn-outline-dark btn-lg my-3'>
                    {apretar ? 'Cargando ...': 'Guardar'}
                </button>
             
             </form>
             </div>
        </div>
    </div>
    }
    </>
    );
}

export default Editar;
