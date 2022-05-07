import React, {useState} from 'react';
import m from "../PacksList.module.css";

const ButtonMyAll = () => {

    const [isActiveButton, setIsActiveButton] = useState<"My" | "All">("My")

    const allOnClickHandler = () => {
        setIsActiveButton("All")
    }
    const myOnClickHandler = () => {
        setIsActiveButton("My")
    }

    return (
        <div className={m.propertySelectGroup}>
            <button className={isActiveButton === "My"
                ? `${m.propertySelectButtonMy} ${m.propertySelectButtonIsActive}`
                : m.propertySelectButtonMy}
                    onClick={myOnClickHandler}

            >My
            </button>
            <button
                className={isActiveButton === "All"
                    ? `${m.propertySelectButtonAll} ${m.propertySelectButtonIsActive}`
                    : m.propertySelectButtonAll}
                onClick={allOnClickHandler}

            >All
            </button>

        </div>
    );
};

export default ButtonMyAll;