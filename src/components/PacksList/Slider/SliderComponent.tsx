import React from 'react';
import Slider from '@mui/material/Slider';
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootReducerType} from "../../Bll/store";

const SliderComponent = () => {
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
            justifyContent: "center",
            alignItems: "center",

            width: 110}}>
            <Slider
                // getAriaLabel={() => 'Temperature range'}
                value={value}
                // style={{width: "120px"}}
                min={minCardsCount} // придет с бэкенда maxCardsCount
                max={maxCardsCount} // придет с бэкенда maxCardsCount
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
            <button>Select</button>
        </Box>
    );
};

export default SliderComponent;