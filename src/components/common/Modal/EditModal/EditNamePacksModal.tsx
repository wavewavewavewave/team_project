import React, {useState} from 'react';
import styles from "./EditNamePacksModal.module.css"
import {deletePackTC, myPackNameEditTC} from "../../../PacksList/packs-reducer";
import {useDispatch} from "react-redux";

type EditNamePacksModalPropsType = {
    active: boolean,
    setActive: (status: boolean) => void,
    id: string,
    defaultName: string,
}


const EditNamePacksModal = ({active, setActive, id, defaultName}: EditNamePacksModalPropsType) => {
    const dispatch: any = useDispatch()

    const [name, setName] = useState<string>(defaultName)

    const closeModal = () => setActive(false)


    const myPackNameEditTCHandler = () => {
        dispatch(myPackNameEditTC({
            cardsPack: {
                _id: id,
                name: name
            }
        }))
        closeModal()
    }


    return (
        <div className={active ? `${styles.modalActive} ${styles.modal}` : `${styles.modal}`} onClick={closeModal}>
            <div className={active
                ? `${styles.modalContent} ${styles.modalContentActive}`
                : `${styles.modalContent}`}
                 onClick={(e) => e.stopPropagation()}>

                <div className={styles.modalTitle}>Changing the deck name</div>


                <div className={styles.modalMessage}>
                    Enter a new deck name {<span
                    style={{fontWeight: "bolder"}}>{defaultName}</span>}
                </div>

                <input
                    autoFocus
                    defaultValue={name}
                    onChange={(e)=> setName(e.currentTarget.value)}/>

                <div className={styles.modalButtonGroup}>
                    <button className={styles.modalSaveButton} onClick={myPackNameEditTCHandler}>Save</button>
                    <button className={styles.modalCloseButton} onClick={closeModal}>Close</button>
                </div>


            </div>

        </div>
    );
};

export default EditNamePacksModal;