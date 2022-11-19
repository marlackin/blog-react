import'./styles/App.css';
import { BrowserRouter, Route,Routes,Link,Navigate} from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar/Navbar.jsx'
import Error from './pages/Error';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth,setIsAuth] = useState(false)
  const [IsLoading,setLoading] = useState(true)


  useEffect(()=>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    } 
  },[])


  return(
  <AuthContext.Provider value={{
    isAuth,
    setIsAuth,
    IsLoading
    }}>
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  </AuthContext.Provider>
  )
}

export default App;
