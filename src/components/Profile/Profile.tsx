import React, {ChangeEvent, useState} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./Profile.module.css"
import personalPhoto from "../../img/ProfileFhoto.jpg"
import photoaparate from "../../img/Photoaparat.png"


const Profile = () => {

    let [changeOn, setChangeOn] = useState(false)

    let [name, setName] = useState("Alfred") // потом доставать из UseSelector

    let cardsValue = 0 // количество карт у пользователя потом доставать из UseSelector

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
                        <span className={m.rowName}>Nickname: </span>
                        {changeOn
                            ?
                            <input onBlur={saveNameHandler} onChange={changeNameHandler} autoFocus value={name}
                                   className={m.personalText}/>
                            :
                            <span className={m.personalText} onDoubleClick={() => setChangeOn(true)}>{name}</span>}
                    </div>
                    <div style={{fontSize: "12px", marginLeft: "40px"}}>(double click to change)</div>
                    <div style={{display: "flex"}}>
                        <span className={m.rowName}>Number of cards:   </span>
                        <span className={m.personalText}>{cardsValue}</span>
                    </div>

                </div>
                <div className={m.buttonContainer}>
                    <button className={m.logoutButton}>Logout</button>

                    <button className={m.saveButton}>Save</button>
                    {/*санка меняющая имя (запрос post на сервер, потом диспатч в стейт)*/}
                </div>
            </div>
        </div>
    );
};

export default Profile;