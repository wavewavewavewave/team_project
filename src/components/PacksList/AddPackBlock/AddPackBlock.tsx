import React from 'react';
import m from "./AddPackBlock.module.css";
import {Button, Paper} from "@mui/material";

const AddPackBlock = () => {
    return (
        <div className={m.addPackBlock}>
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
                    <input className={m.searchInput} placeholder={"Enter the name of the search waiting"}/>
                    <Button
                        // disabled={isDisabledLogoutButton}
                        variant="text"
                        className={m.button}
                        style={{border: "none"}}
                        // onClick={accountClose}
                    >Search
                    </Button>
                </Paper>
                <div className={m.buttonContainer}>


                    <Button
                        // disabled={isDisabledSaveButton}
                        variant="contained"
                        // onClick={editNameHandler}
                        className={m.button}
                        style={{width: "170px"}}
                    >Add new pack</Button>
                </div>


                {/*хард кодом добавить колоду
                            сначала: axios.post('cards/pack', {cardsPack: {name: 'x'}})
                            потом: get, получение всех колод завново с сортировкой которые были выбраны до этого
                            */}
            </div>

        </div>
    );
};

export default AddPackBlock;