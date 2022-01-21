import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Tabs} from 'antd';
import React, {useEffect} from 'react';
import ProForm, {ProFormText} from '@ant-design/pro-form';
import {useIntl, connect, FormattedMessage} from 'umi';
import type {Dispatch} from 'umi';
import type {StateType} from '@/models/login';
import type {LoginParamsType} from '@/services/login';
import type {ConnectState} from '@/models/connect';
import {history} from "umi";

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};


const Login: React.FC<LoginProps> = (props) => {
  useEffect(() => {
    //如果已经登陆了 直接去首页 不能看到登录页面
    const userInfo = localStorage.getItem('userInfo')
    if(userInfo){
     history.replace('/')
    }
  }, [])
  const {submitting} = props;
  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values},
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={"account"}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: '邮箱/密码登录',
            })}
          />
        </Tabs>
        {(
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={'邮箱:super@a.com'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入邮箱!"
                    />
                  ),
                },
                {
                  type: 'email',
                  message: '请输入合法的邮箱地址'
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={'密码:123123'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}
      </ProForm>
    </div>
  );
};

export default connect(({login, loading}: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
