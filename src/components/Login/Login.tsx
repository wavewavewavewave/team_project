import React, { useState } from 'react'
import { useFormik } from "formik";
import s from './Login.module.css';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "./login-reducer";
import { LoginParamsType } from "../api/cards-api";
import { AppRootReducerType } from "../Bll/store";
import { Navigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


export const Login = () => {

    const dispatch = useDispatch<any>()
    const isLoggedIn = useSelector<AppRootReducerType, boolean>(state => state.auth.isLogged)

    const [eye, setEye] = useState(false)
    const handleClick = () => {
        if (eye) {
            setEye(false);
        } else {
            setEye(true)
        }
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(loginTC(values))
        },
    })
    // if (isLoggedIn) {
    //     return <Navigate to={`/profile`} />
    // }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl >
                        <div className={s.box}>
                            <div className={s.inputField}>
                                <div className={s.itIncubator}> It-incubator</div>
                                <div className={s.signIn}> Sign Up</div>
                                <FormGroup className={s.FormGroup}>
                                    <TextField className={s.TextField} label="Email"
                                        margin="normal"
                                        variant="standard"
                                        {...formik.getFieldProps('email')} />

                                    {
                                        formik.errors.email &&
                                            formik.touched.email ?
                                            <div style={{ color: "red" }}>{formik.errors.email}</div>
                                            : null
                                    }

                                    <TextField className={s.TextField} type={eye ? `password` : 'text'}
                                        label="Password"
                                        margin="normal"
                                        variant="standard"
                                        {...formik.getFieldProps('password')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClick}
                                                    >
                                                        {eye ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />
                                    {
                                        formik.errors.password &&
                                            formik.touched.password ?
                                            <div style={{ color: "red" }}>{formik.errors.password}</div>
                                            : null
                                    }

                                    <FormControlLabel label={'Remember me'}
                                        control={
                                            <div style={{ marginLeft: "20px" }}>
                                                <Checkbox
                                                    onChange={formik.handleChange}
                                                    value={formik.values.rememberMe}
                                                    name="rememberMe" />
                                            </div>} />
                                    <a href='#/forgotPas' > forgot password? </a>
                                    <button className={s.loginButton}>
                                        Login
                                    </button>
                                </FormGroup>

                            </div>
                        </div>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
