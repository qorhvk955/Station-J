import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Logout = () => {

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(()=>{
        axios.get('/api/csrf-token', { withCredentials: true })
            .then(response => {
                setCsrfToken(response.data.token);
                axios.post('/logout', {}, {
                    headers: {
                        'X-CSRF-TOKEN': response.data.token
                    },
                    withCredentials: true
                }).then(() => {
                    alert('로그아웃 되었습니다.');
                    window.location.href = '/';
                });
            })
            .catch(error => console.error('Error fetching CSRF token', error));
    }, []);

    return(
        <>
        </>
    );
}

export default Logout;