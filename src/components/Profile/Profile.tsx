import React, {ChangeEvent, useState} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./Profile.module.css"
import personalPhoto from "../../img/ProfileFhoto.jpg"
import photoaparate from "../../img/Photoaparat.png"
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootReducerType} from "../../store";


const Profile = () => {

    //запрос на auth/me, в противном случае редирект на логин

    let [changeOn, setChangeOn] = useState(false)

    let nameState = useSelector<AppRootReducerType, string>((state) => state.auth.name)

    let [name, setName] = useState(nameState) // потом доставать из UseSelector

    let cardsValue = useSelector<AppRootReducerType, number | null>((state) => state.auth.publicCardPacksCount) // количество карт у пользователя потом доставать из UseSelector

    let saveNameHandler = () => {
        setChangeOn(false)

    }
    let changeNameHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setName(value.currentTarget.value)
    }

    return (
        <div className={s.backgroundPage}>
            <div className={m.profilePage}>
                <div className={m.titleBlock}>
                    <span className={m.title}>Personal Information</span>
                    <div className={m.personalPhotoBox}>
                        <img className={m.personalPhoto} src={personalPhoto} alt={"Personal Fhoto"}/>
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

                    <Button variant="contained" className={m.button}>Save</Button>
                    {/*санка меняющая имя (запрос post на сервер, потом диспатч в стейт)*/}
                </div>
            </div>
        </div>
    );
};

export default Profile;