import React, { useState } from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import styles from './Registration.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Bll/auth-reducer';
import { Navigate, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { AppRootReducerType } from '../Bll/store';


export const Registration = () => {

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    
    const isLoggedIn = useSelector<AppRootReducerType, boolean>(state => state.auth.isLogged)

    const [eye, setEye] = useState(true)
    const handleClick = () => {
        if (eye) {
            setEye(false);
        } else {
            setEye(true)
        }
    }


    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно'),
    })

    type SubmitHandlerType = {
        email: string
        password: string
        confirmPassword: string
    }

    const submitHandler = (values: SubmitHandlerType) => {
        dispatch(register(values.email, values.password))
    }


    if (isLoggedIn) {
        return <Navigate to={`/profile`} />
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <div className={styles.registrationBlock}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validateOnBlur
                        onSubmit={submitHandler}
                        validationSchema={validationsSchema}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                            <form onSubmit={handleSubmit} className={styles.form}>

                                <div className={styles.incubator}> It-incubator</div>
                                <div className={styles.signUp}> Sign Up</div>

                                <p style={{ marginTop: '77px' }}>
                                    <label htmlFor={`email`}>Email</label><br />
                                    <input
                                        className={'input'}
                                        type={`email`}
                                        name={`email`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                </p>
                                {touched.email && errors.email && <p className={styles.error}>{errors.email}</p>}

                                <p style={{ marginTop: '24px' }}>
                                    <label htmlFor={`secondName`}>password</label><br />
                                    <input
                                        className={'input'}
                                        type={eye ? `password` : 'text'}
                                        name={`password`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <span onClick={handleClick}>
                                        {eye ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </p>
                                {touched.password && errors.password && <p className={styles.error}>{errors.password}</p>}

                                <p style={{ marginTop: '24px' }}>
                                    <label htmlFor={`confirmPassword`}>Confirm password</label><br />
                                    <input
                                        className={'input'}
                                        type={eye ? `password` : 'text'}
                                        name={`confirmPassword`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                    />
                                    <span onClick={handleClick}>
                                        {eye ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </p>
                                {touched.confirmPassword && errors.confirmPassword &&
                                    <p className={styles.error}>{errors.confirmPassword}</p>}

                                <div>
                                    <button className={styles.cancelButton}
                                        onClick={() => navigate("/login")}
                                        type="button"
                                    >Cancel
                                    </button>

                                    <button className={styles.registerButton}
                                        disabled={!isValid || !dirty}
                                        style={{ opacity: !isValid || !dirty ? '0.5' : '1' }}
                                        type={`submit`}
                                    >Register
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </Grid>
        </Grid>
    );
}

