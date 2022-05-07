import React from 'react';
import Slider from '@mui/material/Slider';
import {Box} from "@mui/material";

const SliderComponent = () => {

    const valuetext = (value: number) => {
        return `${value}°C`;
    }

    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    };
    return (
        <Box sx={{ display: "flex",
            justifyContent: "center",
            alignItems: "center",

            width: 110}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                style={{width: "120px"}}
                min={0}
                max={100}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
};

export default SliderComponent;