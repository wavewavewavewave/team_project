import React, {useEffect} from 'react';
import './App.css'
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {Registration} from "../Registration/Registration";
import Profile from '../Profile/Profile';
import PacksList from "../PacksList/PacksList";
import {CreateNewPassword} from "../Registration/ForgotPassword/CreateNewPassword/CreateNewPassword";
import {ForgotPassword} from "../Registration/ForgotPassword/ForgotPassword";
import {PackCard} from "../PacksList/PackCard/PackCard";
import { CheckEmail } from '../Registration/ForgotPassword/CheckEmail/CheckEmail';
import { LearnPackModal } from '../PacksList/TableRow/LearnPackModal/LearnPackModal';

function App() {
    return (
        <div>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/registration'}>Registration</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
            <NavLink to={'/set-new-password'}>Password</NavLink>
            <NavLink to={'/404'}>404</NavLink>
            <NavLink to={'/packsList'}>Packs List</NavLink>
            <NavLink to={'/cardPack'}>Card Pack</NavLink>

            <Routes>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={'/recoveryPass'} element={<ForgotPassword/>}/>
                <Route path={'/set-new-password'} element={<CreateNewPassword/>}/>
                <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                <Route path="/" element={<Navigate to={"/profile"}/>}/>
                <Route path="/packsList" element={<PacksList/>}/>
                <Route path={'/learnPack/:cardId'} element={<LearnPackModal />}/>
                <Route path={'/cardPack/:id'} element={<PackCard/>}/>
                <Route path={'/checkEmail'} element={<CheckEmail />}/>

            </Routes>
        </div>
    );
}

export default App;
