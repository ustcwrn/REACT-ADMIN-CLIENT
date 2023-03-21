/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Button, Table, Modal, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';
import AddForm from './add-form';
import AuthForm from './auth-form';

export default function Role() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowAuth, setIsShowAuth] = useState(false);
  const addRoleInfo = useRef(null);
  const updateRoleInfo = useRef(null);

  let columns = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time'
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time'
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    },
  ]

  const getRoles = async () => {
    const res = await reqRoles();
    if (res.status === 0) {
      const roles = res.data;
      setRoles(roles);
    }
  }

  const addRole = async () => {
    // 进行表单验证
    if (!addRoleInfo.current.getFieldError('roleName').length) {
      setIsShowAdd(false);
      const roleName = addRoleInfo.current.getFieldValue().roleName;
      const res = await reqAddRole(roleName);
      if (res.status === 0) {
        message.success('添加角色成功！');
        setRoles(roles => [...roles, res.data]);
      } else {
        message.error('添加角色失败！')
      }
    }
    //         addRoleInfo.current.resetFields(['roleName']);
  }

  const updateRole = async () => {
    setIsShowAuth(false);
    const menus = updateRoleInfo.current.state.checkedKeys;
    role.menus = menus;

    // 请求更新
    const res = await reqUpdateRole(role);
    if (res.status === 0) {
      message.success('设置权限成功！');
      setRoles(roles => [...roles]);
    } else {
      message.error('设置权限失败！');
    }
  }


  const onRow = (role) => {
    return {
      onClick: (event) => { // 点击行
        // 勾选
        setRole(role);
      },
    };
  }


  const title = (
    <span>
      <Button type='primary' style={{ width: '100px' }} onClick={() => setIsShowAdd(true)}>创建角色</Button> &nbsp;
      <Button style={{ width: '120px' }} disabled={!role._id} onClick={() => setIsShowAuth(true)}>设置角色权限</Button>
    </span>
  )

  useEffect(() => {
    getRoles();
  }, [])

  return (
    <Card title={title}>
      <Table
        bordered
        rowKey='_id'
        dataSource={roles}
        columns={columns}
        pagination={{ defaultPageSize: PAGE_SIZE }}
        // loading={loading}
        rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
        onRow={onRow}
      />
      <Modal title="添加角色" open={isShowAdd} onOk={addRole} onCancel={() => setIsShowAdd(false)} destroyOnClose>
        <AddForm ref={addRoleInfo} />
      </Modal>
      <Modal title="设置角色权限" open={isShowAuth} onOk={updateRole} onCancel={() => setIsShowAuth(false)} destroyOnClose>
        <AuthForm ref={updateRoleInfo} role={role} />
      </Modal>
    </Card>
  )
}
