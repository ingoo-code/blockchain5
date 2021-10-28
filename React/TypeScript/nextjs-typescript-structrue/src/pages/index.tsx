import React from 'react'
import Head from 'next/head'
import useUser from '../reducers/userHook'

const index = () => {
  const { isLoggedIn, login, logout } = useUser();
  return (
    <>
      <Head>
        <title>Hello ingoo</title>
      </Head>
      {
        !isLoggedIn
        ? <button onClick={()=>login({userid:'web7722',password:'1234'})}>로그인!</button>
        : <button onClick={()=>logout()}>로그아웃!</button>
      }

      <h1> styled component test</h1>
    </>
  )
}

export default index
