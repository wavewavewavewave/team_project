import React from 'react';
import s from './App.module.css';
import {SupButton} from "./components/common/button/SupButton";
import {SupInput} from "./components/common/input/SupInput";
import {SupCheckbox} from "./components/common/checkbox/SupCheckbox";

function App() {
    return (
        <div className={s.App}>
            <div>SupComponents</div>
            <SupButton/>
            <SupInput/>
            <SupCheckbox/>
        </div>
    );
}

export default App;
