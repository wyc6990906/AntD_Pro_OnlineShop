import type {Reducer, Effect} from 'umi';
import {history} from 'umi';

import {fakeAccountLogin} from '@/services/login';
import {message} from 'antd';
import {logout} from "@/services/login";

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

// @ts-ignore
const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      //发送请求执行登录
      const response = yield call(fakeAccountLogin, payload);
      if (response.status == undefined) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });

        message.success('🎉 🎉 🎉  登录成功！');
        history.replace('/');
      }
    },

    * logout(_, {call}) {
     const loading = message.loading('正在退出....')
      //请求api 退出登录
      const response = yield call(logout)
      if(response.status ===undefined){
        //删除本地存储的token和userInfo
        localStorage.removeItem('access_token')
        localStorage.removeItem('userInfo')
        message.success('🎉 🎉 🎉  退出成功！');
        history.replace('/login')
      }
      loading()
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      //将token 存入localstorage
      localStorage.setItem('access_token', payload.access_token)
      return {
        ...state,
      };
    },
    // @ts-ignore
    logout(state, action) {
      return {
        ...state,
      }
    }
  },
};

export default Model;
