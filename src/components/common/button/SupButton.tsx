import React from 'react'
import s from './SupButton.module.css'


const clickMe = () => {
    return (
        alert('Hello')
    )
}

export const SupButton = () => {
    return (
        <button onClick={clickMe} className={s.default}>
            Hello
        </button>
    )
}