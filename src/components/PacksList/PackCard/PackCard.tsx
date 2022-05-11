import React from 'react';
import s from "../../../generalStyle/GeneralStyle.module.css"
import m from "../PacksList.module.css"
import c from './PackCard.module.css'


export const PackCard = () => {
    return (
        <div className={s.backgroundPage}>
            <div className={c.inputBlock}>
                <div>
                    <div className={c.packName}>Pack Name</div>
                    <input className={c.input} placeholder={'Search...'}/>
                    <div className={c.blockColumn} style={{width: "900px", marginLeft: "50px"}}>
                        <div className={c.blockColumnNames} style={{width: '175px'}}>
                            Questions
                        </div>
                        <div className={c.blockColumnNames} style={{justifyContent: "center", width: "514px"}}>
                            Answer
                        </div>
                        <div className={c.blockColumnNames} style={{justifyContent: "center"}}>
                            Last Updated
                        </div>
                        <div className={c.blockColumnNames} style={{justifyContent: "center"}}>
                            Grad
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}