import React from "react";
import LoginForm from "./LoginForm";


const Login = ({csrfToken}) => {
    return(
        <>
            <LoginForm csrfToken={csrfToken} />
        </>
    );
}

export default Login;