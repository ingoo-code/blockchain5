import React from 'react'
import Head from 'next/head'
import useUser from '../reducers/userHook'
import {connect} from 'react-redux'

// const index = () => {
//   const { isLoggedIn, login, logout } = useUser();
//   return (
//     <>
//       <Head>
//         <title>Hello ingoo</title>
//       </Head>
//       {
//         !isLoggedIn
//         ? <button onClick={login}>로그인!</button>
//         : <button onClick={logout}>로그아웃!</button>
//       }

//       <h1> styled component test</h1>
//     </>
//   )
// }


export default connect(
    (state) => state,
)(({fromServer, fromClient, setClientState}) => (
    <div>
        <div>fromServer: {fromServer}</div>
        <div>fromClient: {fromClient}</div>
        <div><button>Set Client State</button></div>
    </div>
));
