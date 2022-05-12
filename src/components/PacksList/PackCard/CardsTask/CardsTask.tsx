import React from 'react';
import c from "../PackCard.module.css";


export const CardsTask = () => {
    return(
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
                Grade
            </div>
        </div>
    )
}