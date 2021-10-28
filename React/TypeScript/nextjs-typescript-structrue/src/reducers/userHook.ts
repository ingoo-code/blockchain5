import {useCallback} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { State } from '../store/store'
import {
  loginRequest,
  logoutRequest,
  LoginRequestPayload
} from './user'


// 커스텀 훅
export default () => {
  const { isLoggedIn } = useSelector((state:State) => state.user)
  const dispatch = useDispatch()

  const login = useCallback((data: LoginRequestPayload) => {
    dispatch(loginRequest(data))
  },[])

  const logout = useCallback(()=>{
    dispatch(logoutRequest())
  },[])

  return {isLoggedIn , login, logout }
}

/*
커스텀 훅을 만들어줬습니다.

useSelector, useDispatch를 따로 userHook 파일 안에 한꺼번에 만들어주고 login, logout 함수도 만들어줬습니다.

이제 내보내서 적용시키는 단계입니다.
*/
