import React, { useState } from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import styles from './CreateNewPassword.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { AppRootReducerType } from '../../../Bll/store';
import { setNewPassword } from '../../../Bll/auth-reducer';


export const CreateNewPassword = () => {

    const dispatch = useDispatch<any>()
    const { token } = useParams<{ token: string }>()


    const [eye, setEye] = useState(true)
    const handleClick = () => {
        if (eye) {
            setEye(false);
        } else {
            setEye(true)
        }
    }


    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    })


    type SubmitHandlerType = {
        password: string
    }

    const submitHandler = (values: any) => {
        if (token)
            dispatch(setNewPassword(values.password, token))
            
    }


    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <div className={styles.block}>
                    <Formik
                        initialValues={{
                            password: '',
                        }}
                        validateOnBlur
                        onSubmit={submitHandler}
                        validationSchema={validationsSchema}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                            <form onSubmit={handleSubmit} className={styles.form}>

                                <div className={styles.incubator}> It-incubator</div>
                                <div className={styles.createNewPassword}> Create new password</div>

                                <p style={{ marginTop: '77px' }}>
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
                                <div>
                                    <button className={styles.Button}
                                        disabled={!isValid || !dirty}
                                        style={{ opacity: !isValid || !dirty ? '0.5' : '1' }}
                                        type={`submit`}
                                    >Create New Password
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

