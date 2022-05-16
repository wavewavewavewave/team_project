import React, {useState} from 'react';
import m from "./TableTitle.module.css";
import {filterTableAC, filterTableValue} from "../packs-reducer";
import {useDispatch} from "react-redux";

const TableTitle = () => {

    const dispatch = useDispatch()

    const [nameSort, setNameSort] = useState<filterTableValue>("0name")
    const [cardsSort, setCardsSort] = useState<filterTableValue>("0cardsCount")
    const [updatedSort, setUpdatedSort] = useState<filterTableValue>("0updated")
    const [createdSort, setCreatedSort] = useState<filterTableValue>("0created")

    const editNameSortHandler = () => {
        if (nameSort === "0name") {
            setNameSort("1name")
            dispatch(filterTableAC(nameSort))
        } else {
            setNameSort("0name")
            dispatch(filterTableAC(nameSort))
        }
    }
    const editCardsSortHandler = () => {
        if (cardsSort === "0cardsCount") {
            setCardsSort("1cardsCount")
            dispatch(filterTableAC(cardsSort))
        } else {
            setCardsSort("0cardsCount")
            dispatch(filterTableAC(cardsSort))
        }
    }
    const editUpdatedSortHandler = () => {
        if (updatedSort === "0updated") {
            setUpdatedSort("1updated")
            dispatch(filterTableAC(updatedSort))
        } else {
            setUpdatedSort("0updated")
            dispatch(filterTableAC(updatedSort))
        }
    }
    const editCreatedSortHandler = () => {
        if (createdSort === "0created") {
            setCreatedSort("1created")
            dispatch(filterTableAC(createdSort))
        } else {
            setCreatedSort("0created")
            dispatch(filterTableAC(createdSort))
        }
    }

    return (
        <div className={m.tableTitle}>
            <div className={m.columnNames} style={{width: "175px"}}>
                <span style={{paddingLeft: "20px"}}>Name</span>

                <div className={nameSort === "0name" ? m.upTriangle : m.downTriangle} onClick={editNameSortHandler}/>

            </div>
            <div className={m.columnNames} style={{justifyContent: "center", width: "80px"}}>
                Cards
                <div className={cardsSort === "0cardsCount" ? m.upTriangle : m.downTriangle}
                     onClick={editCardsSortHandler}/>
            </div>
            <div className={m.columnNames} style={{justifyContent: "center"}}>

                Last Updated
                <div className={updatedSort === "0updated" ? m.upTriangle : m.downTriangle}
                     onClick={editUpdatedSortHandler}/>

            </div>
            <div className={m.columnNames} style={{justifyContent: "center"}}>
                Created
                <div className={createdSort === "0created" ? m.upTriangle : m.downTriangle}
                     onClick={editCreatedSortHandler}/>

            </div>
            <div className={m.columnNames} style={{justifyContent: "center"}}>Actions</div>
        </div>
    );
};

export default TableTitle;