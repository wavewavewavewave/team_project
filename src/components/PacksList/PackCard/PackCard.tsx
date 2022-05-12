import React from 'react';
import s from "../../../generalStyle/GeneralStyle.module.css"
import m from "../PacksList.module.css"
import c from './PackCard.module.css'
import {useDispatch, useSelector} from "react-redux";
import {CardsTask} from "./CardsTask/CardsTask";
import Pagination from "../Pagination/Pagination";
import {CardsBoard} from "./CardsBoard/CardsBoard";
import {AppRootReducerType} from "../../Bll/store";
import {cardPackType} from "../packs-reducer";
import {CardsType} from "./packsCard-reducer";


export const PackCard = () => {

    const dispatch = useDispatch<any>()

    //let packs = useSelector<AppRootReducerType, cardPackType[]>((state) => state.packs.cardPacks)
    let cards = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)
    let answer = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)
    let update = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)
    let grade = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)


    return (
        <div className={s.backgroundPage}>
            <div className={c.inputBlock}>
                <div>
                    <div className={c.packName}>Pack Name</div>
                    <input className={c.input} placeholder={'Search...'}/>
                    <div className={c.blockColumn} style={{marginLeft: "28px"}}>
                        <div className={c.cardsTable}>
                            <CardsTask/>
                            {
                                cards.map((p, index) => {
                                    return (
                                        <CardsBoard
                                            question={p.question}
                                            answer={p.answer}
                                            update={p.updated}
                                            grade={p.grade}
                                            key={index}
                                            index={index}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}