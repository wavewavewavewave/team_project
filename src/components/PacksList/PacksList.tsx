import React, {useState} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./PacksList.module.css"
import {useDispatch, useSelector} from "react-redux";
import Slider from '@mui/material/Slider';
import {Box, Button, Paper} from "@mui/material";
import SliderComponent from "./Slider/SliderComponent";
import ButtonMyAll from "./ButtonMyAll/ButtonMyAll";
import AddPackBlock from "./AddPackBlock/AddPackBlock";
import TableTitle from "./TableTitle/TableTitle";
import TableRow from "./TableRow/TableRow";
import {AppRootReducerType} from "../Bll/store";
import {cardPackType, PacksStateType} from "./packs-reducer";


const PacksList = () => {

    let packs = useSelector<AppRootReducerType, cardPackType[]>((state) => state.packs.cardPacks)

    const dispatch: any = useDispatch()

    // это пригодиться позже:

    // let isLogged = useSelector<AppRootReducerType, boolean>((state) => state.auth.isLogged)
    // if (!isLogged) {
    //     return <Navigate to={`/login`}/>
    // }

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
                                    updated = {p.updated}
                                    created = {p.created}
                                    id={p._id}
                                    userId={p.user_id}
                                    index = {index}
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