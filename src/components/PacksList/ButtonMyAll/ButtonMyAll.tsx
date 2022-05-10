import React, {useState} from 'react';
import m from "../ButtonMyAll/ButtonMyAll.module.css";
import {useDispatch, useSelector} from "react-redux";
import {cardPackType, getPacksTC, showMyAllPacksAC} from "../packs-reducer";
import {AppRootReducerType} from "../../Bll/store";

const ButtonMyAll = () => {

    const dispatch: any = useDispatch()
    let id = useSelector<AppRootReducerType, string>((state) => state.login._id)

    const [isActiveButton, setIsActiveButton] = useState<"My" | "All">("All")

    const allOnClickHandler = () => {
        setIsActiveButton("All")
        dispatch(showMyAllPacksAC(""))
    }
    const myOnClickHandler = () => {
        setIsActiveButton("My")
        dispatch(showMyAllPacksAC(id))
    }

    return (
        <div className={m.propertySelectGroup}>
            <button className={isActiveButton === "My"
                ? `${m.propertySelectButtonMy} ${m.propertySelectButtonIsActive}`
                : m.propertySelectButtonMy}
                    onClick={myOnClickHandler}

            >My
            </button>
            <button
                className={isActiveButton === "All"
                    ? `${m.propertySelectButtonAll} ${m.propertySelectButtonIsActive}`
                    : m.propertySelectButtonAll}
                onClick={allOnClickHandler}

            >All
            </button>

        </div>
    );
};

export default ButtonMyAll;