import React, {useState} from 'react';
import s from "../../generalStyle/GeneralStyle.module.css"
import m from "./PacksList.module.css"
import {useDispatch} from "react-redux";
import Slider from '@mui/material/Slider';
import {Box} from "@mui/material";
import SliderComponent from "./Slider/SliderComponent";
import ButtonMyAll from "./ButtonMyAll/ButtonMyAll";


const PacksList = () => {

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
                    <div className={m.addPackBlock}></div>
                    <div className={m.packsTable}></div>
                    <div className={m.pagination}></div>

                </div>
            </div>
        </div>
    );
};

export default PacksList