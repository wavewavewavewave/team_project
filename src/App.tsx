import React from 'react';
import s from './App.module.css';
import {SupButton} from "./components/common/button/SupButton";
import {SupInput} from "./components/common/input/SupInput";
import {SupCheckbox} from "./components/common/checkbox/SupCheckbox";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {Profile} from "./components/Profile/Profile";

function App() {
    return (
        <div className={s.App}>
            <div>SupComponents</div>
            <SupButton/>
            <SupInput/>
            <SupCheckbox/>
            <div>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    {/*<Route path="*" element={<Navigate to={"/404"}/>}/>*/}
                </Routes>
            </div>
        </div>
    );
}

export default App;
