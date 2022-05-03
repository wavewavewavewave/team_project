import React, {ChangeEvent, useState} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./Profile.module.css"
import photoaparate from "../../img/Photoaparat.png"
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../../store";
import {editNameAC, editNameTC} from "../Bll/auth-reducer";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const Profile = () => {

    //запрос на auth/me, в противном случае редирект на логин


    //без этого не диспатчилась санка:
    type AppDispatch = ThunkDispatch<AppRootReducerType, any, AnyAction>;
    const dispatch: AppDispatch = useDispatch()


    let nameState = useSelector<AppRootReducerType, string>((state) => state.auth.name)
    let cardsValue = useSelector<AppRootReducerType, number | null>((state) => state.auth.publicCardPacksCount) // количество карт у пользователя потом доставать из UseSelector
    let photoUrl = useSelector<AppRootReducerType, string | undefined>((state) => state.auth.avatar)
    let textError = useSelector<AppRootReducerType, string | undefined>((state) => state.auth.error)



    let [name, setName] = useState<string>(nameState)
    let [changeOn, setChangeOn] = useState(false)

    let saveNameHandler = () => {
        setChangeOn(false)

    }
    let changeNameHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setName(value.currentTarget.value)
    }

    let editNameHandler = () => dispatch(editNameTC(name, photoUrl))


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
                    <Button variant="outlined" className={m.button}>Logout</Button>
                    <Button variant="contained" onClick={editNameHandler} className={m.button}>Save</Button>
                    {/*санка меняющая имя (запрос post на сервер, потом диспатч в стейт)*/}
                </div>
            </div>
        </div>
    );
};

export default Profile;