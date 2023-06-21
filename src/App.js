
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
        <Route path='/' element={<Mostrar/>}/>
        <Route path='/crearproducto' element={<Crear />} />
        <Route path='/editarproducto/:id' element={<Editar />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
