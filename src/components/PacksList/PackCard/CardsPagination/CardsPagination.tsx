import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./CardsPagination.module.css"
import {AppRootReducerType} from "../../../Bll/store";
import Pagination from "@mui/material/Pagination";
import {currentCardPageChangeAC} from "../packsCard-reducer";

type CardsPaginationPropsType = {
    id: any
}


export const CardsPagination = (props: CardsPaginationPropsType) => {
    let cardsTotalCount = useSelector<AppRootReducerType, number>((state) => state.cards.cardsTotalCount)
    let pageCount = useSelector<AppRootReducerType, number>((state) => state.cards.pageCount)
    let pageNumber = useSelector<AppRootReducerType, number>((state) => state.cards.page)

    const dispatch = useDispatch<any>()

    let pagesCount = Math.ceil(cardsTotalCount / pageCount)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        if (i <= 10) {
            pages.push(i)
        }
    }


    return (
        <div className={s.pagination}>
            <div>
                {pages.map((p, index) => {

                     return <span className={pageNumber === p ? s.selectedPage : ''}
                                  onClick={() => {
                                      dispatch(currentCardPageChangeAC(p))
                                  }
                                  }>{p}</span>
                })}
                {pages.length >= 10 && "..."}
            </div>
        </div>
    )
}




