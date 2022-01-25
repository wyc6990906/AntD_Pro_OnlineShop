import React, {useRef, useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, Skeleton} from "antd";
import {updateUser, getUserDetail} from "@/services/user";

const Update = (props) => {
  console.log(props)
  const {setShowUpdateUser, showUpdateUser, actionRef, userId} = props
  const [initialForm, setInitialForm] = useState(undefined)
  useEffect(() => {
    if (userId !== '') {
      getUserDetail(userId).then(response => {
        console.log(response)
        setInitialForm({
          name: response.name,
          email: response.email
        })

      })
    }
  }, [])

  //ref 表格
  const [form] = Form.useForm();
  const onFinish = (values) => {
    updateUser(userId,values).then(response => {
      if (response.status === undefined) {
        message.success('修改用户成功')
        //刷新表格数据
        actionRef.current.reload()
        setShowUpdateUser(false)
      }
    })
  }
  const onReset = () => {
    form.resetFields();
  }
  return (
    <Modal title='修改用户' visible={showUpdateUser} onOk={() => {
      setShowUpdateUser(false)
    }} onCancel={() => {
      setShowUpdateUser(false)
    }}
           destroyOnClose={true}
           footer={null}
    >
      {
        initialForm === undefined ? <Skeleton active={true} paragraph={{rows: 4}}/>
          : <Form name="addUserForm"
                  preserve={false}
                  initialValues={initialForm}
                  form={form}
                  labelCol={{
                    span: 6,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  onFinish={onFinish}
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入您的姓名',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入您的邮箱',
                },
                {
                  type: 'email',
                  message: '请输入合法的邮箱格式'
                }
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button key="submit" type="primary" htmlType="submit">
                提交
              </Button>  &nbsp; &nbsp;
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
      }
    </Modal>
  );
};

export default Update;
