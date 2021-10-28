import {createWrapper,HYDRATE} from 'next-redux-wrapper'
import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
  Reducer,
  StoreEnhancer,
  compose,
  Store
} from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import createSaga,{Task} from 'redux-saga'
import user,{UserState} from '../reducers/user'
import rootSaga from '../saga'

export interface SagaStore extends Store {
  sagaTask?: Task,
  __persistor?: any
}

// State Interface
export interface State {
  user:UserState,
}


const combinedReducers = combineReducers({
  user
});


export const rootReducer:Reducer<State,AnyAction> = (state,action) => {
  let rootReducer = action.type === HYDRATE
  ? {...state,...action.payload}
  : combinedReducers(state,action)

  return rootReducer
}

export type RootState = ReturnType<typeof rootReducer>

const getEnhancer = () => {
  const sagaMiddlewares = createSaga()
  const Middlewares = [sagaMiddlewares]
  const enhancer:StoreEnhancer = (
    process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...Middlewares))
    : composeWithDevTools(applyMiddleware(...Middlewares))
  )
  return {enhancer,sagaMiddlewares}
}

const makeStore = () => {
  const isServer = typeof window == 'undefined'
  let {enhancer,sagaMiddlewares} = getEnhancer()

  if (isServer) {
    const Store:SagaStore = createStore(rootReducer,enhancer)
    Store.sagaTask = sagaMiddlewares.run(rootSaga)
    return Store
  } else {
    const {persistStore, persistReducer} = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: "root",
      storage, // localStorage에 저장합니다.
      whitelist: ["user"] // user, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
      // blacklist -> 그것만 제외합니다
    };

    const persistedReducer  = persistReducer(persistConfig,rootReducer)
    const Store:SagaStore = createStore(persistedReducer,enhancer)
    Store.__persistor = persistStore(Store)
    Store.sagaTask = sagaMiddlewares.run(rootSaga)

    return Store
  }
}


const wrapper = createWrapper(makeStore,{
  debug: process.env.NODE_ENV === 'development',
})

export default wrapper
