
import './App.css';
import Mostrar from './componentes/Mostrar';
import Crear from './componentes/Crear';
import Editar from './componentes/Editar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path='/firebase-productos' element={<Mostrar/>}/>
        <Route path='/firebase-productos/crearproducto' element={<Crear />} />
        <Route path='/firebase-productos/editarproducto/:id' element={<Editar />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
