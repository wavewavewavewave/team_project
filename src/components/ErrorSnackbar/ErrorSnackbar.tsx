import React, { SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessageAC } from '../Bll/auth-reducer'
import { AppRootReducerType } from '../Bll/store';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useSelector<AppRootReducerType, string | null>(state => state.auth.error)

    const dispatch = useDispatch();

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(errorMessageAC(null))
    };

    return (
        <Snackbar open={error !== null && error !== ''} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
