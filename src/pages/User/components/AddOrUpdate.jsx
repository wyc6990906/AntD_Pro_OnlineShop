import React, {useRef, useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, Skeleton} from "antd";
import {updateUser, getUserDetail, addUser} from "@/services/user";

const AddOrUpdate = (props) => {
  console.log(props)
  const {isModalShow, setIsModalShow, actionRef, userId,} = props
  const title = userId === undefined ? '添加用户' : '编辑用户'
  const [initialForm, setInitialForm] = useState(undefined)
  useEffect(() => {
    if (userId !== undefined) {
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
  const handleSubmit = (values) => {
      if(userId === undefined){
        addUser(values).then(response => {
          // console.log(response)
          if (response.status === undefined) {
            message.success('添加用户成功')
          }
        })
      } else {
        updateUser(userId, values).then(response => {
          if (response.status === undefined) {
            message.success('修改用户成功')
          }
        })
        //刷新表格数据
        actionRef.current.reload()
        setIsModalShow(false)
      }
  }
  const onReset = () => {
    form.resetFields();
  }
  return (
    <Modal title={title} visible={isModalShow} onOk={() => {
      setIsModalShow(false)
    }} onCancel={() => {
      setIsModalShow(false)
    }}
           destroyOnClose={true}
           footer={null}
    >
      {
        initialForm === undefined && userId ? <Skeleton active={true} paragraph={{rows: 4}}/>
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
                  onFinish={values => handleSubmit(values)}
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

            {userId !== undefined ? '' : <Form.Item
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
            </Form.Item>}

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

export default AddOrUpdate;
