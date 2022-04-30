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
        <div className={s.box}>
            <div className={s.inputField}>
                <div className={s.itIncubator}>
                    It-incubator
                </div>
                <div className={s.signIn}>
                    Sign In
                </div>
                <div>
                        Email
                </div>
                <div>
                    <input/>
                </div>
                <div>
                    Password
                </div>
                <div>
                    <input/>
                </div>
                <div>
                    Forgot Password
                </div>
                <div>
                    <button>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}