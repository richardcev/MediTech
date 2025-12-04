import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PatientListScreen from './screens/PatientListScreen/PatientListScreen.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'
import PatientFormScreen from './screens/PatientFormScreen/index.jsx'
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={ <App/>}></Route>
        <Route path='/pacientes' element={<PatientListScreen/>}></Route>
        <Route path='/paciente/agregar' element={<PatientFormScreen/>}/>
        <Route path='/paciente/:id/editar' element={<PatientFormScreen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
