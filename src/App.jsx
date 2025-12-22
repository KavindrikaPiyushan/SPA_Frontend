import {Routes,Route, Navigate,BrowserRouter} from 'react-router-dom';
import Login from './pages/admin/Login.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import CreateService from './pages/admin/CreateService.jsx';
import ActiveService from './pages/admin/ActiveService.jsx';
import InactiveService from './pages/admin/InactiveService.jsx';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';

function App() {
  

  return (
   
    <BrowserRouter>
    <Routes>
     <Route path= "/admin/login" element= {<Login/>} />
     <Route element={<ProtectedRoutes/>}>
     <Route path= "/admin" element={<AdminLayout/>}> 
      <Route index element={<Navigate to="create-service" replace />} />
     <Route path= "create-service" element={<CreateService/>} />
      <Route path= "active-service" element={<ActiveService/>} />
      <Route path= "inactive-service" element={<InactiveService/>} />
     </Route></Route>


    

    </Routes>
    </BrowserRouter>
  )
}

export default App
