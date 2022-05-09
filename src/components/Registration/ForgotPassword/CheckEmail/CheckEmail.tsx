import { Grid } from '@mui/material'
import React from 'react'
import styles from './CheckEmail.module.css'
import { useSelector } from 'react-redux';
import { AppRootReducerType } from '../../../Bll/store';
import { CheckEmailIcons } from './CheckEmailIcons';


export function CheckEmail() {

  let email = useSelector<AppRootReducerType, string | undefined>(state => state.login.email)


  return (
    <div>
      <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
          <div className={styles.block}>
            <div className={styles.form}>
              <div className={styles.incubator}> It-incubator</div>

              <div className={styles.itemSvg} >
               <CheckEmailIcons  />

              </div>
              <div className={styles.checkEmail}> Check Emael</div>

              <div className={styles.text} >
                We’ve sent an Email with instructions to {email}

              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}


















