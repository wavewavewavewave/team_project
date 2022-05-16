import React from 'react';
import Slider from '@mui/material/Slider';
import {Box, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../../Bll/store";
import {editNumberOfCardsAC} from "../packs-reducer";

const SliderComponent = () => {

    const dispatch = useDispatch()

    let maxCardsCount = useSelector<AppRootReducerType, any>((state) => state.packs.maxCardsCount)
    let minCardsCount = useSelector<AppRootReducerType, any>((state) => state.packs.minCardsCount)
    const valuetext = (value: number) => {
        return `${value}`;
    }

    const [value, setValue] = React.useState<number[]>([0, maxCardsCount]);

    const handleChange = (event: Event, newValue: number | number[]) => {

        setValue(newValue as number[])
    };

    return (
        <Box sx={{ display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 110}}>
            <Slider
                value={value}
                style={{width: "120px"}}
                min={minCardsCount} // придет с бэкенда maxCardsCount
                max={maxCardsCount} // придет с бэкенда maxCardsCount
                onChange={handleChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
            />
            <Button
                onClick={() => dispatch(editNumberOfCardsAC(value[0], value[1]))}
                style={{
                    width: "100px",
                    backgroundColor: "#21268F",
                    borderRadius: "60px",
                    color: "#ECECF9",
                    border: "none",
                    textShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)"
                }}
            >SELECT</Button>
        </Box>
    );
};

export default SliderComponent;