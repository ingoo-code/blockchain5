import {createSlice, PayloadAction } from '@reduxjs/toolkit'


// 초기 상태 타입
export interface UserState {
  isLoggedIn : boolean,
  isLodding: boolean,
  error:any,
  userData: UserDataPayload,
}

// 액션 Payload 타입
export interface LoginRequestPayload {
  userid: string,
  password: string
}

export interface UserDataPayload {
  token:string,
  userid:string,
  password:string,
}

// 초기상태
export const initialState: UserState = {
  isLoggedIn: false,
  isLodding: false,
  error:null,
  userData: null
}


// 리듀서 쪼개기
const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    // loginAction(state: UserState, action: PayloadAction<LoginPayload>) {
    //   state.isLoggedIn = true
    //   state.userData = null;
    // },
    // logoutAction(state: UserState) {
    //   state.isLoggedIn = false
    //   state.userData = null
    // }

    // login
    loginRequest(state:UserState, action:PayloadAction<LoginRequestPayload>){
      state.isLoggedIn = false;
      state.isLodding = true;
      state.error = null;
    },
    loginSuccess(state:UserState, action:PayloadAction<UserDataPayload>){
      state.isLoggedIn = true;
      state.isLodding = false;
      state.error = null;
      state.userData = action.payload
    },
    loginFailure(state:UserState, action:PayloadAction<{error:any}>){
      state.isLoggedIn = false,
      state.isLodding = false;
      state.error = action.payload
    },

    // log out
    logoutRequest(state: UserState){
      state.isLoggedIn = false;
      state.isLodding = true;
      state.error = null;
    },

    logoutSuccess(state: UserState){
      state.isLoggedIn = false;
      state.isLodding = false;
      state.error = null;
    },

    logoutFailure(state: UserState, action:PayloadAction<{error:any}>){
      state.isLoggedIn = false,
      state.isLodding = false,
      state.error = action.payload
    }
  }
})

// 리듀서 & 액션 리턴
const {reducer, actions} = userSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure
} = actions
export default reducer;


/*
테스트 코드는 간단하게 로그인과 로그아웃만 isLoggedIn과 userData로 관리해 주었습니다.

createSlice로 기존의 리덕스에서 액션 타입, 액션 생성함수, 리
듀서를 다 따로 만들어주던걸 한 번에 만들어줄 수 있습니다.
userSlice를 저런식으로 만들어주면 userSlice.reducer,
userSlice.actions 이런식으로 리듀서와 액션타입을 사용할 수 있습니다.
userData의 타입은 테스트 코드에서는
아직 정해진게 없기 때문에 any로 해주었습니다.
이제 내보내준 리듀서와 액션타입들을 container가
따로 없으니 해당디렉토리에 userHooks라는 Custom Hook을 만들어줍니다.


*/
