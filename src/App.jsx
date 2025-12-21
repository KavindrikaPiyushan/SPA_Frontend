import {Routes,Route, Navigate,BrowserRouter} from 'react-router-dom';
import Login from './pages/admin/Login.jsx';
import AdminLayout from './layout/AdminLayout.jsx';


function App() {
  

  return (
   
    <BrowserRouter>
    <Routes>
     <Route path= "/admin/login" element= {<Login/>} />
     <Route path="/admin/dashboard" element= {<AdminLayout/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
