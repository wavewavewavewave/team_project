import React from 'react';
import s from './App.module.css';
import {SupButton} from "../common/button/SupButton";
import {SupInput} from "../common/input/SupInput";
import {SupCheckbox} from "../common/checkbox/SupCheckbox";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {Profile} from "../Profile/Profile";
import {Registration} from "../Registration/Registration";
import {SetPassword} from "../Registration/Password/SetPassword";
import {RecoveryPassword} from "../Registration/Password/RecoveryPassword";

function App() {
    return (
        <div className={s.App}>
            <div>SupComponents</div>
            <SupButton/>
            <SupInput/>
            <SupCheckbox/>
            <div>
                <NavLink to={'/login'}>Login</NavLink>---
                <NavLink to={'/registration'}>Registration</NavLink>---
                <NavLink to={'/profile'}>Profile</NavLink>---
                <NavLink to={'/setPassword'}>Password</NavLink>---
                <NavLink to={'/recoveryPass'}>Recovery Password</NavLink>---
                <NavLink to={'/404'}>404</NavLink>

                <Routes>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={'/setPassword'} element={<SetPassword/>}/>
                    <Route path={'/recoveryPass'} element={<RecoveryPassword/>}/>
                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
