
import './App.css';
import Home from './componentes/Home';
import Mostrar from './componentes/Mostrar';
import Crear from './componentes/Crear';
import Editar from './componentes/Editar';
import NavBar from './componentes/NavBar';
import {Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">

       
      <Routes>
        <Route path="/firebase-productos" element={<NavBar />}>
          <Route path='/firebase-productos/home' element={<Home/>}/>
          <Route path='/firebase-productos/mostrar' element={<Mostrar/>}/>
          <Route path='/firebase-productos/crearproducto' element={<Crear />} />
          <Route path='/firebase-productos/editarproducto/:id' element={<Editar />} />
        </Route>
      </Routes>

      <footer className="text-center mt-5 p-3 bg-body-tertiary">
        <p className="m-0">Sitio desarrollado por Jonathan Ychovsky</p>
      </footer>
    </div>
  );
}

export default App;
