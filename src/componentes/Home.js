import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {collection, getDocs,getDoc, deleteDoc, doc} from 'firebase/firestore';
import { db, deleteFiles } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import {async} from '@firebase/util';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Home = () => {

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

    useEffect(() => {
        getProductos()
    }, []);

    return (
        <div>
            <div className='principal'>
                <h2>El primer paso para tu próximo celular</h2>
                <a href='#productos' className='btn btn-primary'>Comprar</a>
            </div>

            <div className='productos' id='productos'>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                { productos.map((produc)=>(
                    <div className="col" key={produc.id}>
                        <div className="card h-100">
                        {produc.Imagen ? <img src={produc.Imagen} alt={produc.Modelo} className="card-img-top" /> : ''}
                        <div className="card-body">
                            <h5 className="card-title">{produc.Modelo}</h5>
                            <p className="card-text">$ {produc.Precio}</p>
                            <p>{produc.Stock ? <span class="badge text-bg-success">En stock</span>: <span class="badge text-bg-danger">Sin stock</span>}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Home;
