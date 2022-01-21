import type {Effect, Reducer} from 'umi';

import {queryCurrent} from '@/services/user';

export type CurrentUser = {
  id?: string;
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};


const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },
// @ts-ignore
  effects: {
    // * fetch(_, {call, put}) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },
    //获取当前登录用户数据
    * fetchCurrent(_, {call, put}) {
      const userInfo = localStorage.getItem('userInfo')
      let response = {}
      if (!userInfo) {
        response = yield call(queryCurrent);
        //把用户信息存入到local
        localStorage.setItem('userInfo', JSON.stringify(response))
      } else {
        response = JSON.parse(userInfo)
      }

      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },


  },
// @ts-ignore
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
