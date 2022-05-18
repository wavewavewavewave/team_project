import React, {useEffect} from 'react';
import s from "../../../generalStyle/GeneralStyle.module.css"
import m from "../PacksList.module.css"
import c from './PackCard.module.css'
import {useDispatch, useSelector} from "react-redux";
import {CardsTask} from "./CardsTask/CardsTask";
import Pagination from "../Pagination/Pagination";
import {CardsBoard} from "./CardsBoard/CardsBoard";
import {AppRootReducerType} from "../../Bll/store";
import {cardPackType, getPacksTC} from "../packs-reducer";
import {CardsType, packsCardTC} from "./packsCard-reducer";
import {Navigate, useParams} from "react-router-dom";
import {cardsAPI} from "../../api/cards-api";
import {loggedAC} from "../../Bll/auth-reducer";


export const PackCard = () => {

    //let packs = useSelector<AppRootReducerType, cardPackType[]>((state) => state.packs.cardPacks)
    let isLogged = useSelector<AppRootReducerType, boolean>((state) => state.auth.isLogged)
    let cards = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)
    let cardAnswer = useSelector<AppRootReducerType, string>((state) => state.cards.getCards.cardAnswer)
    let update = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)
    let grade = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)
    let cardsPack_id = useSelector<AppRootReducerType, string>((state) => state.cards.getCards.cardsPack_id)
    let cardQuestion = useSelector<AppRootReducerType, string>((state) => state.cards.getCards.cardQuestion)
    //let _id = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards.map(m => ())
    // (tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)

    const params = useParams<'id'>();
    console.log('params', params)
    const id = params
    const dispatch = useDispatch<any>()

    useEffect(() => {
        cardsAPI.me()
            .then((res) => {
                dispatch(loggedAC(true))
                dispatch(packsCardTC(id))
            })
            .catch(() => {
                return <Navigate to={`/login`}/>
                })
            .finally(() => {
                    //убрать крутилку
                })
            }, [])

        if (!isLogged) {
            return <Navigate to={`/login`}/>
            }

    // useEffect(() => {
    //     dispatch(packsCardTC(id))
    // }, [cardsPack_id, cardAnswer, update, cardQuestion])

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