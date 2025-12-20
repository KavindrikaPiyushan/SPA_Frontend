import {Routes,Route, Navigate,BrowserRouter} from 'react-router-dom';
import Login from './pages/admin/Login.jsx';


function App() {
  

  return (
   
    <BrowserRouter>
    <Routes>
     <Route path= "/admin/login" element= {<Login/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
