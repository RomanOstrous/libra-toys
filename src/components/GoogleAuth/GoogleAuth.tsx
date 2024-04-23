/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import './GoogleAuth.scss'

const GoogleAuth = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const responseGoogle = (response: any) => {
    console.log('відповідь',response);
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }

    gapi.load('client:auth2', start)
  },[clientId]);

  return (
    <GoogleLogin
      clientId={`${clientId}`}
      buttonText="Увійти через Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      className='google'
    >
    </GoogleLogin>
  )
}

export default GoogleAuth
