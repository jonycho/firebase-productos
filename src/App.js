
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
        <Route path="/" element={<NavBar />}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/mostrar' element={<Mostrar/>}/>
          <Route path='/crearproducto' element={<Crear />} />
          <Route path='/editarproducto/:id' element={<Editar />} />
        </Route>
      </Routes>

      <footer className="text-center mt-5 p-3 bg-body-tertiary">
        <p className="m-0">Sitio desarrollado por Jonathan Ychovsky</p>
      </footer>
    </div>
  );
}

export default App;
