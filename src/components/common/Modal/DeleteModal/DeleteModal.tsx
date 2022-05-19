import React from 'react';
import styles from "./Modal.module.css"
import {deletePackTC} from "../../../PacksList/packs-reducer";
import {useDispatch} from "react-redux";

type DeleteModalPropsType = {
    active: boolean,
    setActive: (status: boolean) => void,
    id: string,
    name: string,
}


const DeleteModal = ({active, setActive, id, name}: DeleteModalPropsType) => {
    const dispatch: any = useDispatch()

    const closeModal = () => setActive(false)

    const cardDelete = () => {
        dispatch(deletePackTC(id))
        closeModal()
    }


    return (
        <div className={active ? `${styles.modalActive} ${styles.modal}` : `${styles.modal}`} onClick={closeModal}>
            <div className={active
                ? `${styles.modalContent} ${styles.modalContentActive}`
                : `${styles.modalContent}`}
                 onClick={(e) => e.stopPropagation()}>

                <div className={styles.modalTitle}>Delete Pack</div>


                <div className={styles.modalMessage}>
                    Do you really want to delete the deck with the name {<span
                    style={{fontWeight: "bolder"}}>{name}</span>} ?
                </div>

                <div className={styles.modalButtonGroup}>
                    <button className={styles.modalYesButton} onClick={cardDelete}>Yes</button>
                    <button className={styles.modalNoButton} onClick={closeModal}>No</button>
                </div>


            </div>

        </div>
    );
};

export default DeleteModal;