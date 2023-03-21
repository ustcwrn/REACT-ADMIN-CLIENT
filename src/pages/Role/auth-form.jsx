import { Form, Input, Tree } from 'antd';
import React, { Children, useEffect, useRef, useState } from 'react'
import menuList from '../../config/menuConfig'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
// 实现componentWillMount()
const useComponentWillMount = func => {
  const willMount = useRef(true);

  if (willMount.current) {
    func(menuList);
  }
  willMount.current = false;
};

function AuthForm(props, ref) {
  const role = props.role;
  const [checkedKeys, setCheckedKeys] = useState(role.menus || []);
  let treeData = [{ title: '平台权限', key: '0-0', children: [] }];
  useComponentWillMount((menuList) => {
    treeData[0].children = menuList;
  })


  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  // 选中监听
  const onCheck = (checkedKeys, info) => {
  };


  return (
    <Form
      {...layout}
      name="control-hooks"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="roleName"
        label="角色名称"
        initialValue={role.name}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="authTree"
      >
        <Tree
          name='auth-tree'
          checkable
          defaultCheckedKeys={checkedKeys}
          defaultExpandAll={true}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
          ref={ref}
        />
      </Form.Item>
    </Form>
  )
}
export default React.forwardRef(AuthForm);