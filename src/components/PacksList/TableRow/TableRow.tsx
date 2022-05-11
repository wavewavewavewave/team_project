import React from 'react';
import m from "./TableRow.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../../Bll/store";
import {NavLink} from "react-router-dom";
import {deletePackTC} from "../packs-reducer";

type TableRowPropsType = {
    name: string,
    cards: number,
    updated: string,
    created: string,
    id: string,
    userId: string,

    index: number
}

// чуть позже пригодится:
// let isDisabledDeleteButton = useSelector<AppRootReducerType, boolean>((state) => state.auth.isDisabledSaveButton)
// let isDisabledEditButton = useSelector<AppRootReducerType, boolean>((state) => state.auth.isDisabledLogoutButton)
// let isDisabledLearnButton = useSelector<AppRootReducerType, boolean>((state) => state.auth.isDisabledLogoutButton)

const TableRow = (props: TableRowPropsType) => {

    const dispatch: any = useDispatch()

    let updateDate = props.updated.slice(0, 10)
    let createdDate = props.created.slice(0, 10)

    let userId = useSelector<AppRootReducerType, string>((state) => state.login._id)

    let rowStyle = props.index % 2 != 0 ? `${m.tableRow}` : `${m.tableRow} + ${m.tableRowStyle}`


    const cardDelete = (id: string) => {
        dispatch(deletePackTC(id))
    }

    return (
        <div className={rowStyle}>
            <div className={m.columnValues} style={{width: "175px"}}>
                <NavLink to={
                    {
                        pathname: '/profile', // нужно поменять на адрес компоненты карточкм
                        search: `?id=${props.id}`
                    }
                }>
                    {props.name}
                </NavLink>

            </div>
            <div className={m.columnValues} style={{justifyContent: "center", width: "80px"}}>{props.cards}</div>
            <div className={m.columnValues} style={{justifyContent: "center"}}>{updateDate}</div>
            <div className={m.columnValues} style={{justifyContent: "center"}}>{createdDate}</div>
            <div className={m.columnValues} style={{justifyContent: "space-around"}}>
                {
                    userId === props.userId
                        ? <div>
                            <button className={m.deleteButton} onClick={()=> cardDelete(props.id)}>Delete</button>
                            <button className={m.editButton}>Edit</button>
                            <button className={m.editButton}>Learn</button>

                        </div>
                        : <button className={m.editButton}>Learn</button>

                }

            </div>
        </div>
    );
};

export default TableRow;