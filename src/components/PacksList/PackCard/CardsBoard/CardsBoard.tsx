import React, {useEffect} from 'react';
import s from "../CardsBoard/CardsBoard.module.css";



export type CardsBoardType = {
    question: string
    answer: string
    update: string
    grade: null
    index: number
}

export const CardsBoard = (props: CardsBoardType) => {

     let rowStyle = props.index % 2 != 0 ? `${s.cardsRow}` : `${s.cardsRow} + ${s.cardsRowStyle}`

    return (
        <div className={rowStyle}>
            <div className={s.columnQuestion} >
                {props.question}
            </div>
            <div className={s.columnAnswer} >
                {props.answer}
            </div>
            <div className={s.columnUpdate} >
                {props.update}
            </div>
            <div className={s.columnGrade} >
                {props.grade}
            </div>
        </div>
    )
}