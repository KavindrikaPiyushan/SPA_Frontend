import {Routes,Route, Navigate,BrowserRouter} from 'react-router-dom';
import Login from './pages/admin/Login.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import CreateService from './pages/admin/CreateService.jsx';
import ActiveService from './pages/admin/ActiveService.jsx';
import InactiveService from './pages/admin/InactiveService.jsx';


function App() {
  

  return (
   
    <BrowserRouter>
    <Routes>
     <Route path= "/admin/login" element= {<Login/>} />
     <Route path= "/admin" element={<AdminLayout/>}> 
      <Route index element={<Navigate to="create-service" replace />} />
     <Route path= "create-service" element={<CreateService/>} />
      <Route path= "active-service" element={<ActiveService/>} />
      <Route path= "inactive-service" element={<InactiveService/>} />
     </Route>

    

    </Routes>
    </BrowserRouter>
  )
}

export default App
