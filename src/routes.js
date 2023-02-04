import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./Pages/Main";
import Repositorio from "./Pages/Repositorio";

export default function AllRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/repositorio/:repositorio" element={<Repositorio/>} />
            </Routes>        
        </BrowserRouter>
    );
}