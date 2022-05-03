import React from 'react'
import {Form, useFormik} from "formik";
import s from './Login.module.css';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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
            alert(JSON.stringify(values));
        },
    })


    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <div className={s.box}>
                            <div className={s.inputField}>
                                <FormLabel>
                                    <div className={s.itIncubator}>
                                        <p>It-incubator</p>
                                    </div>
                                    <div className={s.signIn}>
                                        <p>Sign In</p>
                                    </div>
                                </FormLabel>
                                <FormGroup>
                                    <TextField label="Email"
                                               margin="normal"
                                               variant="standard"
                                               {...formik.getFieldProps('email')}/>

                                    {
                                        formik.errors.email &&
                                        formik.touched.email ?
                                            <div style={{color: "red"}}>{formik.errors.email}</div>
                                            : null
                                    }

                                    <TextField type="password"
                                               label="Password"
                                               margin="normal"
                                               variant="standard"
                                               {...formik.getFieldProps('password')}/>

                                    {
                                        formik.errors.password &&
                                        formik.touched.password ?
                                            <div style={{color: "red"}}>{formik.errors.password}</div>
                                            : null
                                    }

                                    <FormControlLabel label={'Remember me'} control={<Checkbox
                                        onChange={formik.handleChange}
                                        value={formik.values.rememberMe}
                                        name="rememberMe"/>}/>
                                        <button  className={s.loginButton}>
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