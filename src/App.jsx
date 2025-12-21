import {Routes,Route, Navigate,BrowserRouter} from 'react-router-dom';
import Login from './pages/admin/Login.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import CreateService from './pages/admin/CreateService.jsx';



function App() {
  

  return (
   
    <BrowserRouter>
    <Routes>
     <Route path= "/admin/login" element= {<Login/>} />
     <Route path= "/admin" element={<AdminLayout/>}> 
      <Route index element={<Navigate to="service" replace />} />
     <Route path= "service" element={<CreateService/>} />

     </Route>

    

    </Routes>
    </BrowserRouter>
  )
}

export default App
