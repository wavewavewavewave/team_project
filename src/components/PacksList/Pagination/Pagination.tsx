import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import m from "./Pagination.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../../Bll/store";
import {cardPackType, currentPageChangeAC, getPacksTC, sizePageChangeAC} from "../packs-reducer";
import {number} from "yup";
//
// export type PaginationPropsType = {
//     pageNumber: number
// }

const Pagination = () => {

    let cardPacksTotalCount = useSelector<AppRootReducerType, number>((state) => state.packs.cardPacksTotalCount)
    let pageSize = useSelector<AppRootReducerType, number>((state) => state.packs.pageCount)
    let pageNumber = useSelector<AppRootReducerType, number>((state) => state.packs.getParams.page)


    // useEffect(()=> {
    //     dispatch(getPacksTC())
    // }, [pageNumber])

    const dispatch: any = useDispatch()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(sizePageChangeAC(Number(e.currentTarget.value)))
    }


    let pagesCount = Math.ceil(cardPacksTotalCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }

    const portionSize = 5 // размер количества страниц для одновременного отображения

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={m.pagination}>
        {portionNumber > 1 && <button style={{backgroundColor: "bisque"}} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>Prev</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((c, index) => {
                return <button style={{width: "40px"}} key={index}
                               onClick={(e) => {
                                   dispatch(currentPageChangeAC(c))
                                   dispatch(getPacksTC())
                               }}
                               className={pageNumber === c ? m.selectedPage : ""}>{c}</button>
            })
        }
        {portionCount > portionNumber && <button style={{backgroundColor: "bisque"}} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>Next</button>}

        <select
            value={pageSize}
            onChange={handleChange}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
    </div>

};

export default Pagination;