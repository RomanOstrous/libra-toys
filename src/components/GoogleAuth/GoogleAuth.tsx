import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import './GoogleAuth.scss'

const GoogleAuth = () => {

  const clientId = "88092891520-fd4c7t6lrqmgubjs2dtg4bqvfj2v513u.apps.googleusercontent.com";
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
  },[]);

  return (
    <GoogleLogin
      clientId={clientId}
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
