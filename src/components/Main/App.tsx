import React, {useEffect} from 'react';
import s from './App.module.css';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {Registration} from "../Registration/Registration";
import Profile from '../Profile/Profile';
import PacksList from "../PacksList/PacksList";
import {CreateNewPassword} from "../Registration/ForgotPassword/CreateNewPassword/CreateNewPassword";
import {ForgotPassword} from "../Registration/ForgotPassword/ForgotPassword";

function App() {
     return (
        <div className={s.App}>
                <NavLink to={'/login'}>Login</NavLink>---
                <NavLink to={'/registration'}>Registration</NavLink>---
                <NavLink to={'/profile'}>Profile</NavLink>---
                <NavLink to={'/setPassword'}>Password</NavLink>---
                <NavLink to={'/recoveryPass'}>Recovery Password</NavLink>---
                <NavLink to={'/404'}>404</NavLink>
                <NavLink to={'/packsList'}>Packs List</NavLink>

                <Routes>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={'/setPassword'} element={<ForgotPassword/>}/>
                    <Route path={'/recoveryPass'} element={<CreateNewPassword/>}/>
                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="/" element={<Navigate to={"/profile"}/>}/>
                    <Route path="/packsList" element={<PacksList/>}/>
                </Routes>
            </div>
    );
}

export default App;
