import React, {useEffect} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./PacksList.module.css"
import {useDispatch, useSelector} from "react-redux";
import SliderComponent from "./Slider/SliderComponent";
import ButtonMyAll from "./ButtonMyAll/ButtonMyAll";
import AddPackBlock from "./AddPackBlock/AddPackBlock";
import TableTitle from "./TableTitle/TableTitle";
import TableRow from "./TableRow/TableRow";
import {AppRootReducerType} from "../Bll/store";
import {cardPackType, getPacksTC} from "./packs-reducer";
import {cardsAPI} from "../api/cards-api";
import {setUserAC} from "../Login/login-reducer";
import {loggedAC} from "../Bll/auth-reducer";
import {Navigate} from "react-router-dom";


const PacksList = () => {

    let packs = useSelector<AppRootReducerType, cardPackType[]>((state) => state.packs.cardPacks)
    let packName = useSelector<AppRootReducerType, string>((state) => state.packs.getParams.packName)
    let user_id = useSelector<AppRootReducerType, string>((state) => state.packs.getParams.user_id)
    let sortPacks = useSelector<AppRootReducerType, string>((state) => state.packs.getParams.sortPacks)

    const dispatch: any = useDispatch()

    useEffect(() => {
        //показать крутилку
        dispatch(getPacksTC())
    }, [packName, user_id, sortPacks])


    let isLogged = useSelector<AppRootReducerType, boolean>((state) => state.auth.isLogged)
    if (!isLogged) {
        return <Navigate to={`/login`}/>
    }

    return (
        <div className={s.backgroundPage}>
            <div className={m.packsPage}>
                <div className={m.cardsSettings}>
                    <div className={m.propertySelect}>
                        <div className={m.propertySelectTitle}>Show packs cards</div>
                        <ButtonMyAll/>
                    </div>
                    <div className={m.propertySelect}>
                        <div className={m.propertySelectTitle}>Number of cards</div>
                        <div className={m.propertySelectGroup}>
                            <SliderComponent/>
                        </div>
                    </div>

                </div>
                <div className={m.packsList}>
                    <AddPackBlock/>
                    <div className={m.packsTable}>
                        <TableTitle/>
                        {
                            packs.map((p, index) => {
                                return <TableRow
                                    key={index}
                                    name={p.name}
                                    cards={p.cardsCount}
                                    updated={p.updated}
                                    created={p.created}
                                    id={p._id}
                                    userId={p.user_id}
                                    index={index}
                                />
                            })
                        }
                    </div>
                    <div className={m.pagination}/>

                </div>
            </div>
        </div>
    );
};

export default PacksList