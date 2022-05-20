import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";


export const AddCard = () => {

    const dispatch = useDispatch<any>()


    return (
        <div>
<Button variant="contained" style={{width: "170px", backgroundColor: "#21268F", borderRadius: "60px"}}>
    Add new card
</Button>
        </div>
    )
}