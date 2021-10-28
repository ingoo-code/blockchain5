import {PayloadAction} from '@reduxjs/toolkit'
import {all,fork,takeLatest,call,put} from 'redux-saga/effects'
import axios from 'axios'
// https://velog.io/@skyepodium/axios-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0%EB%A1%9C-API-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  LoginRequestPayload
} from '../reducers/user'

import user from '../api/user'


/**
 *  API 함수
 */


/**
 * Saga 실행 함수
 */
function* login(action:PayloadAction<LoginRequestPayload>) {
  try{
    const result = yield call(user.loginAPI, action.payload)
    yield put(loginSuccess(result.data))
  } catch (e){
    console.log(`e :`,e)
    yield put(loginFailure(e))
  }
}


/**
 * Watch 함수
 */
function* watchLogin(){
  yield takeLatest(loginRequest.type,login)
}


export default function* userSaga(){
  yield all([
    fork(watchLogin),
    // fork(watchLogout)
  ])
}



/*
Saga는 Generator함수를 이용합니다 (function 뒤에 *)

yield를 이용하여 비동기작업을 해줄 수 있습니다.

작동원리는 위의 코드에서 주석으로 적어놓았습니다.

watch 함수에서는 takeLatest를 사용해주었는데 이와 유사한 다양한 기능들이 많습니다.



take = 이벤트 리스너같은 역할, 치명적인 단점, 일회용

한번 실행시키면 한번밖에 받지않아서 그 다음에 다시 실행시키면 이벤트가 사라져서 안됩니다.

해결하기 위해서는 while (true) {yield take()} 로 감싸주면 되는데 직관적이지 않아서 보통 takeEvery를 씁니다.

takeEvery와의 차이점은 while take는 동기적으로 동작하고 takeEvery는 비동기로 동작합니다.



takeEvery = 들어오는 이벤트를 실행시킵니다. 여기서도 단점이 있는데 가끔 한번에 두번이 클릭되면

그 두번을 모두 실행시켜버립니다.



takeLastest = 마지막으로 들어온 이벤트를 실행시킵니다. 이미 완료된 거 제외하고

한번에 여러개가 들어오거나 하면 완료되지 않은 이전의 것들을 없애고 마지막을 실행시킵니다.



takeleading = 처음으로 들어온 이벤트를 실행시킵니다.

한번에 여러개가 들어왔을때 처음것이 아직 완료되기 전이면 이후의 것들은 없앱니다.



그러나 takeLastest, takeLeading은 프론트서버에서만 그렇게 적용되고 백엔드서버에서는

여러번의 요청에 대해 모두 실행되어 여러번 저장됩니다.

그래서 백엔드에서도 검사를 해주어야 합니다.

하지만 보통은 이걸 사용하고 서버쪽에서 검증를 하는 방법을 많이 씁니다.



throttle = 마지막 인자로 시간을 넣어주면 그 시간동안에는

여러번의 요청이 들어와도 무조건 한번만 실행됩니다. 이건 백엔드서버에서도 한번만 요청됩니다.



debouncing = 연이어 호출되는 함수들 중 특정 시간동안 마지막 함수(또는 제일 처음)만 호출되도록 합니다.
 */
