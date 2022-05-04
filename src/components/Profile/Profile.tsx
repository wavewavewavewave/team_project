import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./Profile.module.css"
import photoaparate from "../../img/Photoaparat.png"
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editNameAC, editNameTC, loggedAC, LogoutTC} from "../Bll/auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AppRootReducerType} from "../Bll/store";
import {Navigate, useNavigate} from 'react-router-dom';
import {cardsAPI} from "../api/cards-api";

const Profile = () => {


    //без этого не диспатчилась санка:
    // type AppDispatch = ThunkDispatch<AppRootReducerType, any, AnyAction>;
    const dispatch: any = useDispatch()

    let nameState = useSelector<AppRootReducerType, string>((state) => state.login.name)
    let cardsValue = useSelector<AppRootReducerType, number | null>((state) => state.login.publicCardPacksCount) // количество карт у пользователя потом доставать из UseSelector
    let photoUrl = useSelector<AppRootReducerType, string | undefined>((state) => state.login.avatar)
    let textError = useSelector<AppRootReducerType, string | undefined>((state) => state.login.error)
    //let isLogged = useSelector<AppRootReducerType, boolean>((state) => state.auth.isLogged)


    let [name, setName] = useState<string>(nameState)
    let [changeOn, setChangeOn] = useState(false)
    // useEffect(() => {
    //     //показать крутилку
    //     cardsAPI.me()
    //         .then(() => {
    //             dispatch(loggedAC(true))
    //         })
    //         .catch(() => {
    //             navigate(`/login`)
    //         })
    //         .finally(() => {
    //             //убрать крутилку
    //         })
    // },)

    // if (!isLogged) {
    //     return <Navigate to={`/login`}/>
    // }


    let saveNameHandler = () => {
        setChangeOn(false)

    }
    let changeNameHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setName(value.currentTarget.value)
    }

    let editNameHandler = () => dispatch(editNameTC(name, photoUrl))

    let accountClose = () => dispatch(LogoutTC())


    return (
        <div className={s.backgroundPage}>
            <div className={m.profilePage}>
                <div className={m.titleBlock}>
                    <span className={m.title}>Personal Information</span>
                    <div className={m.personalPhotoBox}>
                        <img className={m.personalPhoto} src={photoUrl} alt={"Personal Photo"}/>
                        <div className={m.photoButtonBox}>
                            <img className={m.downloadPhotoButton}/>
                            <img className={m.photoaparate} src={photoaparate}/>
                        </div>
                    </div>
                </div>
                <div className={m.inputContainer}>
                    <div className={m.nameBox}>
                        {changeOn

                            ? <div style={{display: "flex", flexDirection: "column"}}>
                                {/*<span className={m.rowName}>Nickname: </span>*/}
                                <FormControl variant="standard">
                                    <InputLabel className={m.rowName} htmlFor="component-simple">Nickname</InputLabel>
                                    <Input id="component-simple" onBlur={saveNameHandler} onChange={changeNameHandler}
                                           autoFocus={true} value={name}/>
                                </FormControl>
                            </div>

                            : <div style={{display: "flex", flexDirection: "column"}}>
                                {/*<span className={m.rowName}>Nickname: </span>*/}
                                <FormControl disabled variant="standard">
                                    <InputLabel className={m.rowName} htmlFor="component-disabled">Nickname</InputLabel>
                                    <Input id="component-disabled" className={m.inputValue} value={name}
                                           onDoubleClick={() => setChangeOn(true)}/>
                                    <FormHelperText>(double click to change)</FormHelperText>
                                    <div style={{color: "red"}}>{textError}</div>
                                </FormControl>
                            </div>
                        }
                    </div>

                    <div style={{display: "flex"}}>
                        <FormControl disabled variant="standard">
                            <InputLabel className={m.rowName} htmlFor="component-disabled">Number of cards:</InputLabel>
                            <Input id="component-disabled" value={cardsValue}/>
                        </FormControl>
                    </div>

                </div>

                <div className={m.buttonContainer}>
                    <Button variant="outlined" className={m.button} onClick={accountClose}>Logout</Button>
                    <Button variant="contained" onClick={editNameHandler} className={m.button}>Save</Button>
                    {/*санка меняющая имя (запрос post на сервер, потом диспатч в стейт)*/}
                </div>
            </div>
        </div>
    );
};

export default Profile;