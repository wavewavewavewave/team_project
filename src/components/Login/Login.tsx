import React from 'react'
import {useFormik} from "formik";
import s from './Login.module.css';

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })


    return (
        <div className={s.loginPage}>
            <div>
                <input/>
            </div>
        </div>
    )
}