import React, {useRef} from 'react';
import {Button, Form, Input, message, Modal} from "antd";
import {addUser} from "@/services/user";

const Create = (props) => {
  // console.log(props)
  const {setShowAddUser, showAddUser, actionRef} = props


  //ref 表格
  const [form] = Form.useForm();
  const onFinish = (values) => {
    addUser(values).then(response => {
      // console.log(response)
      if (response.status === undefined) {
        message.success('添加用户成功')
        //刷新表格数据
        actionRef.current.reload()
        setShowAddUser(false)
      }
    })
  }
  const onReset = () => {
    form.resetFields();
  }
  return (
    <Modal title='添加用户' visible={showAddUser} onOk={() => {
      setShowAddUser(false)
    }} onCancel={() => {
      setShowAddUser(false)
    }}
           destroyOnClose={true}
           footer={null}
    >
      <Form name="addUserForm"
            preserve={false}
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
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码',
            },
            {
              min: 6,
              message: '密码至少6位',
            },
          ]}
        >
          <Input.Password/>
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
    </Modal>
  );
};

export default Create;
