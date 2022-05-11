import React from 'react';
import s from "../../../generalStyle/GeneralStyle.module.css"
import m from "../PacksList.module.css"
import TextField from "@mui/material/TextField";


export const PackCard = () => {
    return (
        <div className={s.backgroundPage}>
            <div className={m.packsPage}>
                <div>
                    <TextField/>
                </div>
            </div>
        </div>
    )
}