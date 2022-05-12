import React from 'react';
import {useParams} from "react-router-dom";
import s from "../CardsBoard/CardsBoard.module.css";
import m from "../../TableRow/TableRow.module.css";

export type CardsBoardType = {
    question: string
    answer: string
    update: string
    grade: number
    index: number
}

export const CardsBoard = (props: CardsBoardType) => {

    const params = useParams();

     let rowStyle = props.index % 2 != 0 ? `${s.cardsRow}` : `${s.cardsRow} + ${s.cardsRowStyle}`

    return (
        <div className={rowStyle}>
            <div>
                {props.question}
            </div>
            <div className={s.columnAnswer} style={{justifyContent: "center"}}>
                {props.answer}
            </div>
            <div className={s.columnUpdate} style={{justifyContent: "center"}}>
                {props.update}
            </div>
            <div className={s.columnGrade} style={{justifyContent: "center"}}>
                {props.grade}
            </div>
        </div>
    )
}