import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Secret from './Secret'
import Success from './Success'

function App() {
  return(
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Secret/>}></Route>
                <Route path="/success" element={<Success/>}> </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App