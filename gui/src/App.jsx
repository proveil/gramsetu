import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import useAuthStore from './store/authStore'
import PanelHome from './dashboard/desktop/PanelHome'
import PanelEBook from './dashboard/desktop/PanelEBook'
import PanelNews from './dashboard/desktop/PanelNews'
import PanelNewsId from './dashboard/desktop/PanelNewsId'
import PanelGSchemes from './dashboard/desktop/PanelGSchemes'
import PanelGSchemeId from './dashboard/desktop/PanelGSchemeId'
import PanelEBookId from './dashboard/desktop/PanelEBookId'
import PanelEmergencies from './dashboard/desktop/PanelEmergencies'
import PanelEmergenciesId from './dashboard/desktop/PanelEmergenciesId'
import PanelESchemes from './dashboard/desktop/PanelESchemes'
import PanelESchemesId from './dashboard/desktop/PanelESchemesId'
import PanelVideoGuide from './dashboard/desktop/PanelVideoGuide'
import PanelVideoGuideId from './dashboard/desktop/PanelVideoGuideId'
import ResetPassword from './auth/ResetPassword'

const App = () => {
  const {checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route index element={<PanelHome/>}/>
        <Route path='news' element={<PanelNews/>}/>
        <Route path='news/:id' element={<PanelNewsId/>}/>
        <Route path='gov-schemes' element={<PanelGSchemes/>}/>
        <Route path='gov-schemes/:id' element={<PanelGSchemeId/>}/>
        <Route path='E_Books' element={<PanelEBook/>}/>
        <Route path='E_Books/:id' element={<PanelEBookId/>}/>
        <Route path='emergency-services' element={<PanelEmergencies/>}/>
        <Route path='emergency-services/:id' element={<PanelEmergenciesId/>}/>
        <Route path='eschemes' element={<PanelESchemes/>}/>
        <Route path='eschemes/:id' element={<PanelESchemesId/>}/>
        <Route path='guides' element={<PanelVideoGuide/>}/>
        <Route path='guides/:id' element={<PanelVideoGuideId/>}/>
      </Route>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App