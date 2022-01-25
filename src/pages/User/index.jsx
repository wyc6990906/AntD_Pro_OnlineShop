import React, {useRef, useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Switch, Avatar, Modal, Form, Input} from 'antd';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {getUsers, lockUser} from "@/services/user";
import AddOrUpdate from "@/pages/User/components/AddOrUpdate";

const UserList = () => {
  const [isModalShow, setIsModalShow] = useState(false)
  const [userId, setUserId] = useState(undefined)


  const showModal = (show,id=undefined) => {
    setUserId(id)
    setIsModalShow(show)
  }

  //获取用户列表
  const getUsersData = async (params) => {
    const response = await getUsers(params)
    return {
      data: response.data,
      success: true,
      total: response.meta.pagination.total
    }
  }
  //启用用户
  const [form] = Form.useForm();
  const onLockChange = (checked, id) => {
    console.log(checked, id)
    lockUser(id).then(response => {
      if (response.status === undefined) {
        message.success('操作成功')
      } else {
        message.error('操作失败')
      }
    })
  }
  const actionRef = useRef();
  //定义表格列
  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center'
    },
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      align: 'center',
      render: (_, record) => {
        return [
          <Avatar key={record.id} size={32} src={record.avatar_url}/>
        ]
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '是否禁用',
      valueType: 'is_locked',
      align: 'center',
      hideInSearch: true,
      render: (text, record) => [
        <Switch key={record.id} onChange={(checked) => onLockChange(checked, record.id)} checkedChildren="启用"
                unCheckedChildren="禁用"
                defaultChecked={record.is_locked === 0}/>
      ],
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // console.log(record)
            showModal(true,record.id)
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        request={async (params, sort, filter) => {
          return getUsersData({params: params})
        }}
        columns={columns}
        align="center"
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button key="button" onClick={() => {
            showModal(true)
          }} icon={<PlusOutlined/>} type="primary">
            新建
          </Button>,
        ]}
      >
      </ProTable>
      {/*/!*弹框*!/*/}
      {
        isModalShow ?
          <AddOrUpdate isModalShow={isModalShow}
                       setIsModalShow={setIsModalShow}
                       actionRef={actionRef}
                       userId={userId}
          /> : ''
      }
      {/*<Create showAddUser={showAddUser}*/}
      {/*        setShowAddUser={setShowAddUser}*/}
      {/*        actionRef={actionRef}/>*/}
      {/*{*/}
      {/*  showUpdateUser ?*/}
      {/*    <Update showUpdateUser={showUpdateUser}*/}
      {/*            setShowUpdateUser={setShowUpdateUser}*/}
      {/*            actionRef={actionRef}*/}
      {/*            userId={userId}*/}
      {/*    /> : ''*/}
      {/*}*/}
    </PageContainer>
  );
};

export default UserList;
