import React from 'react'
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
    
    <Helmet>
    <title>Home Page</title>
  </Helmet>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:"100vh", fontSize:'40px'}}>

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6F1lwhvX8pdc6xF9epjYW80MMBrk9cAcjw&usqp=CAU" alt="" />

<h1>Home page</h1>
    </div>
    </>
  )
}

export default Home