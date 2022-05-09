import React, {useEffect} from 'react';
import './App.css';

import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {Registration} from "../Registration/Registration";
import {ForgotPassword} from "../Registration/ForgotPassword/ForgotPassword";
import Profile from '../Profile/Profile';
import { CreateNewPassword } from '../Registration/ForgotPassword/CreateNewPassword/CreateNewPassword';
import { CheckEmail } from '../Registration/ForgotPassword/CheckEmail/CheckEmail';
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';

function App() {
     return (
        <div >
             <ErrorSnackbar />

                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/registration'}>Registration</NavLink>
                <NavLink to={'/profile'}>Profile</NavLink>
                <NavLink to={'/forgotPas'}>Forgot password</NavLink>
                <NavLink to={'/set-new-password'}>Create new password</NavLink>
                <NavLink to={'/404'}>404</NavLink>

                <Routes>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={'/forgotPas'} element={<ForgotPassword/>}/>
                    <Route path={'/set-new-password/:token'} element={<CreateNewPassword/>}/>
                    <Route path={'/set-new-password'} element={<CreateNewPassword/>}/>
                    <Route path={'/checkEmail'} element={<CheckEmail />}/>
                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="/" element={<Navigate to={"/profile"}/>}/>
                </Routes>
            </div>
    );
}

export default App;
