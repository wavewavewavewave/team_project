import React, {useState} from 'react';
import styles from "./AddNewPackModal.module.css"
import {addNewPackTC} from "../../../PacksList/packs-reducer";
import {useDispatch} from "react-redux";


type AddNewPackModalPropsType = {
    active: boolean,
    setActive: (status: boolean) => void,
}


const AddNewPackModal = ({active, setActive}: AddNewPackModalPropsType) => {

    const dispatch: any = useDispatch()

    const [name, setName] = useState<string>("")
    const [isChecked, setIsChecked] = useState(false)

    const closeModal = () => setActive(false)


    const addNewPackModalHandler = () => {

        dispatch(addNewPackTC({
            cardsPack: {
                name: name,
                deckCover: "",
                private: isChecked,
            }
        }))
        setName("")
        setIsChecked(false)
        closeModal()
    }


    return (
        <div className={active ? `${styles.modalActive} ${styles.modal}` : `${styles.modal}`} onClick={closeModal}>
            <div className={active
                ? `${styles.modalContent} ${styles.modalContentActive}`
                : `${styles.modalContent}`}
                 onClick={(e) => e.stopPropagation()}>

                <div className={styles.modalTitle}>Enter the name of the new pack</div>

                <input
                    autoFocus
                    onChange={(e) => setName(e.currentTarget.value)}/>

                <div style={{display: "flex"}}>
                    <input
                        type="checkbox"
                        onChange={(e) => setIsChecked(e.currentTarget.checked)}
                        checked={isChecked}/>
                    <span>This pack is private</span>
                </div>

                <div className={styles.modalButtonGroup}>
                    <button className={styles.modalSaveButton} onClick={addNewPackModalHandler}>Add</button>
                    <button className={styles.modalCloseButton} onClick={closeModal}>Close</button>
                </div>


            </div>

        </div>
    );
};

export default AddNewPackModal;