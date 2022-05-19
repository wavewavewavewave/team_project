import React, {useEffect, useState} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./PacksList.module.css"
import {useDispatch, useSelector} from "react-redux";
import SliderComponent from "./Slider/SliderComponent";
import ButtonMyAll from "./ButtonMyAll/ButtonMyAll";
import AddPackBlock from "./AddPackBlock/AddPackBlock";
import TableTitle from "./TableTitle/TableTitle";
import TableRow from "./TableRow/TableRow";
import {AppRootReducerType} from "../Bll/store";
import {cardPackType, getPacksTC, GetParamsType} from "./packs-reducer";
import {Navigate} from "react-router-dom";
import Pagination from "./Pagination/Pagination";
import {CircularProgress, Grid, Paper} from "@mui/material";
import {cardsAPI} from "../api/cards-api";
import {setUserAC} from "../Login/login-reducer";
import {loggedAC} from "../Bll/auth-reducer";


const PacksList = () => {
    let isLogged = useSelector<AppRootReducerType, boolean>((state) => state.auth.isLogged)
    let packs = useSelector<AppRootReducerType, cardPackType[]>((state) => state.packs.cardPacks)
    let circularProgress = useSelector<AppRootReducerType, boolean>((state) => state.packs.circularProgress)
    let {
        min,
        max,
        sortPacks,
        user_id,
        packName,
        pageCount,
        ...rest
    } = useSelector<AppRootReducerType, GetParamsType>((state) => state.packs.getParams)

    const dispatch: any = useDispatch()


//1111
    useEffect(() => {
        cardsAPI.me()
            .then((res) => {
                dispatch(loggedAC(true))
                dispatch(getPacksTC())
            })
            .catch(() => {
                return <Navigate to={`/login`}/>
            })
            .finally(() => {
                //убрать крутилку
            })
    }, [packName, user_id, sortPacks, pageCount, min, max])

    if (!isLogged) {
        return <Navigate to={`/login`}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <div className={s.backgroundPage}>

                    {circularProgress &&
                    <CircularProgress style={{
                        display: "block",
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        zIndex: "1"
                    }}/>}

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
                                <Paper elevation={6}>
                                    <TableTitle/>
                                    {
                                        packs.map((p, index) => {
                                            const {v4: uuidv4} = require('uuid');
                                            return (
                                                <TableRow
                                                    key={uuidv4()}
                                                    name={p.name}
                                                    cards={p.cardsCount}
                                                    updated={p.updated}
                                                    created={p.created}
                                                    id={p._id}
                                                    userId={p.user_id}
                                                    index={index}
                                                />
                                            )
                                        })
                                    }
                                </Paper>
                            </div>
                            <Pagination/>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default PacksList