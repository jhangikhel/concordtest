import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

export const PrivateRouter = ({ component: Component, ...rest }) => {
    let history = useHistory();
    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={() => {
                localStorage.clear();
                history.push('/');
            }}>
                Logout
            </Button>
            <Route {...rest}

                render={
                    props => localStorage.getItem("userName") ?
                        <Component {...props}></Component> :
                        <Redirect to="/"></Redirect>
                }>
            </Route>
        </React.Fragment>
    );
}

export default PrivateRouter;