/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Card, Button, Table, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqCategorys } from '../../api';
import './index.css'


export default function Category() {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parentId, setParentId] = useState('0');
  const [subCategorys, setSubCategorys] = useState([]);
  const [parentName, setParentName] = useState('');

  // 显示指定一级分类列表
  const showCategorys = () => {
    setParentId('0');
    setParentName('');
    setSubCategorys([]);
  }

  // 显示指定一级分类列表的子列表
  const showSubCategorys = (category) => {
    setParentId(category._id);
    setParentName(category.name);
  }

  // card左侧
  const title = parentId === '0' ? '一级分类列表' : (
    <span className='category-title'>
      <Button type='link' style={{ width: 105 }} onClick={showCategorys}>一级分类列表</Button>
      <ArrowRightOutlined style={{ paddingRight: 5 }} />
      <span>{parentName}</span>
    </span>
  )
  // card右侧
  const extra = (
    <Button type='primary'><PlusOutlined />添加</Button>
  )

  // const dataSource = [
  //   {
  //     "_id": {
  //       "$oid": "5e12b8bce31bb727e4b0e348"
  //     },
  //     "parentId": "0",
  //     "name": "家用电器",
  //     "__v": 0
  //   }, {
  //     "_id": {
  //       "$oid": "5e130e60e31bb727e4b0e34b"
  //     },
  //     "parentId": "0",
  //     "name": "手机",
  //     "__v": 0
  //   }, {
  //     "_id": {
  //       "$oid": "5e130ec7e31bb727e4b0e34c"
  //     },
  //     "parentId": "0",
  //     "name": "洗衣机",
  //     "__v": 0
  //   }, {
  //     "_id": {
  //       "$oid": "5e1346533ed02518b4db0cd7"
  //     },
  //     "parentId": "0",
  //     "name": "图书",
  //     "__v": 0
  //   }
  // ];


  // 获取一级/二级分类列表
  const getCategorys = async () => {
    console.log(parentId)
    const res = await reqCategorys(parentId);
    if (res.status === 0) {
      const categorys = res.data;
      if (parentId === '0') {
        // 更新一级分类状态
        setCategorys(categorys);
      } else {
        setSubCategorys(categorys);
      }
      setLoading(false);
    } else {
      message.error('获取分类列表失败');
    }
  }

  // 指定列
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: '300px',
      render: (category) => (
        <span>
          <a>修改分类</a> &nbsp;
          {parentId === '0' ? <a onClick={() => showSubCategorys(category)}>查看子分类</a> : null}
        </span>
      ),
    },
  ];

  useEffect(() => {
    getCategorys();
  }, [parentId]);

  return (
    <Card
      title={title}
      bordered={false}
      style={{
        width: 1200,
      }}
      extra={extra}
    >
      <Table
        bordered
        rowKey='_id'
        dataSource={parentId === '0' ? categorys : subCategorys}
        columns={columns}
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        loading={loading}
      />;
    </Card>
  )
}
