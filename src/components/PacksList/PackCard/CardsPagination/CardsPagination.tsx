import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./CardsPagination.module.css"
import {AppRootReducerType} from "../../../Bll/store";
import {changeCardsSizePageAC, currentCardPageChangeAC, packsCardTC} from "../packsCard-reducer";

type CardsPaginationPropsType = {
    id: any
}


export const CardsPagination = (props: CardsPaginationPropsType) => {
    let cardsTotalCount = useSelector<AppRootReducerType, number>((state) => state.cards.cardsTotalCount)
    let pageCount = useSelector<AppRootReducerType, number>((state) => state.cards.pageCount)
    let pageNumber = useSelector<AppRootReducerType, number>((state) => state.cards.page)

    const dispatch = useDispatch<any>()

    const handlerChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeCardsSizePageAC(Number(e.currentTarget.value)))
    }
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
                {/*{portionCardCount > 1 && <button style={{backgroundColor: "bisque"}}*/}
                {/*                                 onClick={onClickHandler}>Prev</button>}*/}
                {/*{pages*/}
                {/*    .filter(p => p >= leftCardPortionPageNumber && p <= rightCardPortionPageNumber)*/}
                {/*    .map((p, index) => {*/}
                {/*        return <button style={{width: "40px"}} key={index}*/}
                {/*                       onClick={(e) => {*/}
                {/*                           dispatch(currentCardPageChangeAC(p))*/}
                {/*                           dispatch(packsCardTC(props.id))*/}
                {/*                       }}*/}
                {/*                       className={pageNumber === p ? s.selectedPage : ""}>*/}
                {/*            {p}</button>*/}
                {/*    })}*/}
                {/*{portionCardCount > portionCardNumber && <button style={{backgroundColor: "bisque"}}*/}
                {/*                                                 onClick={handler}>Next</button>}*/}
                {/*<Pagination count={10} shape="rounded" color="secondary"/>*/}

                {/*<select value={pageCount} onChange={handlerChange}>*/}
                {/*    <option value={"5"}>5</option>*/}
                {/*    <option value={"10"}>10</option>*/}
                {/*    <option value={"15"}>15</option>*/}
                {/*</select>*/}
            </div>
        </div>
    )
}




