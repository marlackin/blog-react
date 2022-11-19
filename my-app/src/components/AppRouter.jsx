import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import Posts from "../pages/Posts";
import About from "../pages/About";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes,publicRoutes } from "../router";
import Login from "../pages/Login";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";


const AppRouter = ()=>{
   const {isAuth,setIsAuth,isLoading} = useContext(AuthContext)
   console.log(isAuth)

   if(isLoading){
    return <Loader/>
   }
    return(
      isAuth
          ?<Routes>
          {privateRoutes.map((route) => (
            <Route 
              element ={route.element} 
              path={route.path} 
              exact = {route.exact}
              key = {route.path}
              />
          ))}
          <Route path="*" element={<Posts/>}/>
        </Routes>
          :<Routes>
            {publicRoutes.map((route) => (
            <Route 
              element ={route.element} 
              path={route.path} 
              exact = {route.exact}
              key = {route.path}
              />
          ))}
          <Route path="*" element={<Login/>}/>
          </Routes>

    )
}

export default AppRouter