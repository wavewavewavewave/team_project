import React, { useState } from 'react';
import m from "./TableRow.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppRootReducerType } from "../../Bll/store";
import { NavLink, useNavigate } from "react-router-dom";
import { addNewPackTC, deletePackTC, myPackNameEditTC } from "../packs-reducer";
import DeleteModal from "../../common/Modal/DeleteModal/DeleteModal";
import EditNamePacksModal from "../../common/Modal/EditModal/EditNamePacksModal";

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
    const navigate = useNavigate();

    let updateDate = props.updated.slice(0, 10)
    let createdDate = props.created.slice(0, 10)

    let userId = useSelector<AppRootReducerType, string>((state) => state.login._id)

    let rowStyle = props.index % 2 != 0 ? `${m.tableRow}` : `${m.tableRow} + ${m.tableRowStyle}`


    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [editModalActive, setEditModalActive] = useState(false)

    const onLearnModelClick = (id: string) => navigate(`/learnPack/${id}`);

    return (
        <div className={rowStyle}>
            <DeleteModal id={props.id} active={deleteModalActive} setActive={setDeleteModalActive} name={props.name} />
            <EditNamePacksModal id={props.id} active={editModalActive} setActive={setEditModalActive} defaultName={props.name} />

            <div className={m.columnValues} style={{ width: "175px" }}>
                <NavLink to={
                    {
                        pathname: `/cardPack/${props.id}`, // нужно поменять на адрес компоненты карточкм
                        search: `?id=${props.id}`
                    }
                }>
                    {props.name}
                </NavLink>

            </div>
            <div className={m.columnValues} style={{ justifyContent: "center", width: "80px" }}>{props.cards}</div>
            <div className={m.columnValues} style={{ justifyContent: "center" }}>{updateDate}</div>
            <div className={m.columnValues} style={{ justifyContent: "center" }}>{createdDate}</div>
            <div className={m.columnValues} style={{ justifyContent: "space-around" }}>
                {
                    userId === props.userId
                        ? <div>
                            <button className={m.deleteButton} onClick={() => setDeleteModalActive(true)}>Delete</button>
                            <button className={m.editButton} onClick={() => setEditModalActive(true)}>Edit</button>
                            {props.cards > 0 ? <button className={m.editButton} onClick={() => onLearnModelClick(props.id)}>Learn</button> : null}

                        </div>
                        : props.cards > 0 ? <button className={m.editButton} onClick={() => onLearnModelClick(props.id)}>Learn</button> : "No cards"
                }
            </div>
        </div>
    );
};

export default TableRow;