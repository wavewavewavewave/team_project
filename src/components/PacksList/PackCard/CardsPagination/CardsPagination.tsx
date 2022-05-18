import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./CardsPagination.module.css"
import {AppRootReducerType} from "../../../Bll/store";
import {Pagination, styled} from "@mui/material";
import {changeCardsSizePageAC} from "../packsCard-reducer";
import usePagination from "@mui/material/usePagination";
// import Pagination from "../../Pagination/Pagination";


export const CardsPagination = () => {

    let cardsTotalCount = useSelector<AppRootReducerType, number>((state) => state.cards.cardsTotalCount)
    let pageCount = useSelector<AppRootReducerType, number>((state) => state.cards.pageCount)
    let pageNumber = useSelector<AppRootReducerType, number>((state) => state.cards.page)

    const dispatch = useDispatch<any>()

    const handlerChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeCardsSizePageAC(Number(e.currentTarget.value)))
    }

    const List = styled('ul')({
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
    });

    const UsePagination = () => {
        const {items} = usePagination({
            count: 10,
        });

        let cardPageCount = Math.ceil(cardsTotalCount / pageCount)
        let pages = []
        for (let i = 1; i <= cardPageCount; i++) {
            pages.push(i)
        }
        return (
            <nav>
                <List>
                    {pages.map(({page, type, selected, ...item}, index) => {
                        let children = null;

                        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                            children = '…';
                        } else if (type === 'page') {
                            children = (
                                <button
                                    type="button"
                                    style={{
                                        fontWeight: selected ? 'bold' : undefined,
                                    }}
                                    {...item}
                                >
                                    {page}
                                </button>
                            );
                        } else {
                            children = (
                                <button type="button" {...item}>
                                    {type}
                                </button>
                            );
                        }

                        return <li key={index}>{children}</li>;
                    })}
                </List>
            </nav>
        );
    }
}


// let cardPageCount = Math.ceil(cardsTotalCount / pageCount)
// let pages = []
// for (let i = 1; i <= cardPageCount; i++) {
//     pages.push(i)
// }
//
// const portionCardSize = 5
//
// let portionCardCount = Math.ceil(cardPageCount / portionCardSize)
// let [portionCardNumber, setPortionCardNumber] = useState<number>(1)
// let leftCardPortionPageNumber = (portionCardNumber - 1) * portionCardSize + 1
// let rightCardPortionPageNumber = portionCardNumber * portionCardSize
//
//
// return (
//     <div className={s.pagination}>
//         {/*<Pagination/>*/}
//         <div>
//             <Pagination count={10} shape="rounded" color="secondary"/>
//
//             <select value={pageCount} onChange={handlerChange}>
//                 <option value={"5"}>5</option>
//                 <option value={"10"}>10</option>
//                 <option value={"15"}>15</option>
//             </select>
//         </div>
//     </div>
// )
