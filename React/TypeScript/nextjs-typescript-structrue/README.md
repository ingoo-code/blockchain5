# NextJS Setting..

> npm init

  기본설정
> npm install next react react-dom

  etc..
> npm install next-images styled-components

  TypeScript
> npm install --save-dev typescript @types/react @types/node

  dev
> babel-plugin-inline-react-svg
> eslint
> eslint-config-prettier
> eslint-config-standard
> eslint-plugin-import
> eslint-plugin-node
> eslint-plugin-pretiier
> eslint-pluginpromise
> eslint-plugin-standard
> prettier

  styeld components
> npm install -d styled-components @types/styled-components styled-normalize babel-plugin-styled-components

## 기본 환경설정

1. .editorconfig

  IDE 관계없이 일정한 코드 스타일을 유지하기 위해 도와주는 설정파일

2. .eslintrc.json

  ESLint

  개발 코드 작성을 동일성 하기 위함.

3. .eslintignore

  ESLint 적용시 직접 개발한 외 내용들 제거하기
  gitignore와 비슷한 개념

4. babel.config.js

  babal setting (styled-components) 설정을 위한

5. next.config.js

  next 웹팩설정.

6. prettier.config.js

  코딩 스타일 맞추기!

7. package.json

  scripts 내용 수정하기
  ```
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
  ```


# step 1

Hello world 찍기

# step 2

styled-components 셋팅 해보기

# step 3

redux 셋팅하기

목록
- next-redux-wrapper
- react-redux
- redux
- redux-devtools-extension
- redux-saga


npm install next-redux-wrapper react-redux redux redux-devtools-extension redux-saga

# redux toolkit ??

npm install @reduxjs/toolkit

리액트 프로젝트를 진행하며 상태관리시에 프로젝트 규모가 작으면 Context API를 이용하고

그 외에 경우에는 Redux 또는 Mobx를 많이 사용하는것 같습니다.

리덕스는 액션 타입, 액션 실행함수, 리듀서 이렇게 만들어주고 관리하는 특성이 있어서 코드량이 많아진다는 단점이 있습니다.

그렇지만 Redux DevTools 등을 이용하여 상태변화를 하나하나 다 체크하고 확인할 수 있기 때문에 안정성은 높다는 평가가 많아요.

저는 리덕스의 Redux Toolkit이 리덕스의 코드를 확 줄여줘서 정말 편하다고 하길래 찾아봤습니다.

직접 테스트를 조금 해보니까 좀 많이 편한거 같아서 앞으로 자주 이용할 생각입니다.

1. reducer/user.ts 제작하기
2. reducer/userHook.ts 제작하기
3. reducer/index.ts 제작하기


# persist 적용하기

리덕스 사용하면서 새고로침하여 상태가 바뀌는 형상을 고치기

npm install redux-persist

  localStorage에 저장하고 싶으면 import storage from 'redux-persist/lib/storage

  session Storage에 저장하고 싶으면 import storageSession from 'redux-persist/lib/storage/session


reducer 작성한 영역 store/store.ts


참고사이트
https://lemontia.tistory.com/1012
