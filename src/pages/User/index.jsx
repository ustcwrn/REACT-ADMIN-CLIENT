/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Table, Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { reqUsers } from '../../api';
import formateDate from '../../utils/dateUtils';
import './index.css'

export default function User() {
  const [users, setUsers] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [roles, setRoles] = useState([]);
  let roleNames;
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: (create_time) => formateDate(create_time)
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (role_id) => roleNames?.[role_id]
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          <a onClick={() => { user }}>修改用户</a> &nbsp;
          <a onClick={() => { user }}>删除用户</a>
        </span>
      ),
    }
  ];
  const addOrUpdateUser = () => {

  }

  const initRoleNames = (roles) => {
    roleNames = roles.reduce((pre, role) => {
      pre[role.id] = role.name;
      return pre;
    }, {})
  }
  const getUsers = async () => {
    const res = await reqUsers();
    if (!res.status) {
      const { users, roles } = res.data;
      setRoles(roles);
      setUsers(users);
    }
  }


  const title = (
    <span className='user-card-title'>
      <Button type='primary' style={{ width: '105px' }}>创建用户</Button>
    </span>
  )

  useEffect(() => {
    getUsers();
    initRoleNames(roles)
  }, [])

  return (
    <Card
      title={title}
      bordered={false}
      style={{
        width: 1200
      }}
    // extra={extra}
    >
      <Table
        bordered
        rowKey='_id'
        dataSource={users}
        columns={columns}
        pagination={{ defaultPageSize: 3 }}
      // loading={loading}
      />;
      <Modal
        title="创建用户"
        open={isShow}
        onOk={addOrUpdateUser}
        onCancel={() => setIsShow(false)}
        destroyOnClose
      >
        /
      </Modal>
    </Card>
  )
}
