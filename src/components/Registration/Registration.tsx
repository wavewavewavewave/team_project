import React, {useState} from 'react';
import {Formik} from 'formik'
import * as yup from 'yup'
import styles from './Registration.module.css'
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {registerTC} from '../Bll/auth-reducer';
import {Navigate, useNavigate} from 'react-router-dom';
import {AppRootReducerType} from "../Bll/store";


export const Registration = () => {


    // const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const error = useSelector<AppRootReducerType, string | undefined>(state => state.auth.error)


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


    const submitHandler = (values: any) => {

        dispatch(registerTC(values.email, values.password))
    }


    return (
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
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                    <form onSubmit={handleSubmit} className={styles.from}>

                        <div className={styles.incubator}> It-incubator</div>
                        <div className={styles.signUp}> Sign Up</div>
                        <h1 className={styles.error}>{error}</h1>

                        <p style={{marginTop: '77px'}}>
                            <label htmlFor={`email`}>Email</label><br/>
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

                        <p style={{marginTop: '24px'}}>
                            <label htmlFor={`secondName`}>password</label><br/>
                            <input
                                className={'input'}
                                type={eye ? `password` : 'text'}
                                name={`password`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <span onClick={handleClick}>
                {eye ? <FaEye/> : <FaEyeSlash/>}
              </span>
                        </p>
                        {touched.password && errors.password && <p className={styles.error}>{errors.password}</p>}

                        <p style={{marginTop: '24px'}}>
                            <label htmlFor={`confirmPassword`}>Confirm password</label><br/>
                            <input
                                className={'input'}
                                type={eye ? `password` : 'text'}
                                name={`confirmPassword`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                            <span onClick={handleClick}>
                {eye ? <FaEye/> : <FaEyeSlash/>}
              </span>
                        </p>
                        {touched.confirmPassword && errors.confirmPassword &&
                        <p className={styles.error}>{errors.confirmPassword}</p>}

                        <div>
                            <button className={styles.cancelButton}
                                // disabled={!isValid || !dirty}
                                    onClick={() => navigate("/login")}
                                    type="button"
                            >Cancel
                            </button>

                            <button className={styles.registerButton}
                                    disabled={!isValid || !dirty}
                                // onClick={() => handleSubmit()}
                                    type={`submit`}
                            >Register
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

