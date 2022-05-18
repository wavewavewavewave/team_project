import React, {useState} from 'react';
import m from "./AddPackBlock.module.css";
import {Button, Paper} from "@mui/material";
import {useDispatch} from "react-redux";
import {addNewPackTC, editSearchNameAC, getPacksTC} from "../packs-reducer";
import AddNewPackModal from "../../common/Modal/AddNewPackModal/AddNewPackModal";

const AddPackBlock = () => {

    const dispatch: any = useDispatch()

    let [searchValue, setSearchValue] = useState<string>("")

    const setNewValue = () => {
        dispatch(editSearchNameAC(searchValue))
        // dispatch(getPacksTC())
    }

    // const addNewPackTCHandler = () => {
    //     dispatch(addNewPackTC({
    //         cardsPack: { // потом эти данные брать из стейта или еще как
    //             name: "New Pack",
    //             deckCover: "",
    //             private: false,
    //         }
    //     }))
    // }

    const [addNewPackModalActive, setAddNewPackModalActive] = useState(false)

    return (
        <div className={m.addPackBlock}>

            <AddNewPackModal active={addNewPackModalActive} setActive={setAddNewPackModalActive}/>

            <div className={m.addPackTitle}>Packs list</div>
            <div className={m.addPackTitle}>
                <Paper elevation={6} style={{
                    display: "flex",
                    justifyContent: "stretch",
                    alignItems: "center",
                    width: "430px",
                    border: "1px solid #635D80",
                    backgroundColor: "#ECECF9"
                }}>
                    <input
                        className={m.searchInput}
                        placeholder={"Enter the name of the search waiting"}
                        onChange={(e) => {setSearchValue(e.currentTarget.value)}}
                    />
                    <Button
                        // disabled={isDisabledLogoutButton}
                        variant="text"
                        className={m.button}
                        style={{border: "none"}}
                        onClick={() => setAddNewPackModalActive(true)}
                    >Search
                    </Button>
                </Paper>
                <div className={m.buttonContainer}>
                    <Button
                        // disabled={isDisabledSaveButton}
                        variant="contained"
                        className={m.button}
                        style={{width: "170px", backgroundColor: "#21268F", borderRadius: "60px"}}
                        onClick={()=>setAddNewPackModalActive(true)}
                    >Add new pack</Button>
                </div>
            </div>

        </div>
    );
};

export default AddPackBlock;