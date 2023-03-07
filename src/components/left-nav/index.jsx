import React from 'react'
import './index.css'
import logo from '../../assets/image/logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('首页', '/home', <PieChartOutlined />),
  getItem('商品', '/products', <MailOutlined />, [
    getItem('品类管理', '/category'),
    getItem('商品管理', '/product'),
  ]),
  getItem('用户管理', '/user', <PieChartOutlined />),
  getItem('角色管理', '/role', <PieChartOutlined />),
  getItem('图形图表', '/charts', <PieChartOutlined />, [
    getItem('柱状图', '/charts/bar'),
    getItem('折线图', '/charts/line'),
    getItem('饼图', '/charts/pie'),
  ]),
];


export default function LeftNav() {
  let navigate = useNavigate();
  let location = useLocation();
  const [collapsed] = useState(false);

  const menuClick = (e) => {
    navigate(e.key)
  }

  // 获取默认的openkeys
  let defaultOpenKeys = '';
  
  items.forEach(item => {
    if (item.children) {
      for (let child of item.children) {
        if (child.key === location.pathname) {
          defaultOpenKeys =  item.key;
        }
      }
    }
  })

  return (
    <div className='left-nav'>
      <Link className='left-nav-header '>
        <img src={logo} alt="logo" />
        <h1>楠楠后台</h1>
      </Link>
      <Menu
        defaultSelectedKeys={['/home']}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[defaultOpenKeys]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={menuClick}
      />
    </div>
  )
}
