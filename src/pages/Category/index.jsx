/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react'
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqAddCategorys, reqCategorys, reqUpdateCategorys } from '../../api';
import './index.css'
import AddForm from './add-form';
import UpdateForm from './update-form';


export default function Category() {
  // 状态管理
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parentId, setParentId] = useState('0');
  const [subCategorys, setSubCategorys] = useState([]);
  const [parentName, setParentName] = useState('');
  const [showStatus, setShowStatus] = useState(0); // 标识添加、更新的确认框是否显示
  const [updateCategoryObj, setUpdateCategoryObj] = useState('');
  const inputCategoryName = useRef(null); // 传递给update-form组件，获取input框的值
  const inputAddCategory = useRef(null);

  // 显示指定一级分类列表的子列表
  const showSubCategorys = (category) => {
    setParentId(category._id);
    setParentName(category.name);
  }

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


  // 响应取消确认框
  const handleCancel = () => {
    setShowStatus(0);
  };
  // 显示添加的确认框
  const showAdd = () => {
    setShowStatus(1);
  }
  // 添加分类
  const addCategory = async () => {
    inputAddCategory.current.validateFields().then( async (value) => {
      setShowStatus(0);
      // 收集数据，并提交添加分类的请求
      const { categoryName, parentId } = inputAddCategory.current.getFieldsValue();
      const res = await reqAddCategorys(categoryName, parentId);
      if (res.status === 0) {
        getCategorys();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // 显示修改的确认框
  const showUpdate = (category) => {
    // 保存分类对象
    setUpdateCategoryObj(category);
    // 更新状态
    setShowStatus(2);
  }

  // 修改分类
  const updateCategory = () => {
    inputCategoryName.current.validateFields().then(async (values) => {
      // 隐藏确认框
      setShowStatus(0);
      // 准备数据
      const categoryId = updateCategoryObj._id;
      const { categoryName } = values;
      const res = await reqUpdateCategorys(categoryName, categoryId);
      if (res.status === 0) {
        getCategorys();
      }
    }).catch((err) => {
      console.log(err);
    })
  }




  // 显示指定一级分类列表
  const showCategorys = () => {
    setParentId('0');
    setParentName('');
    setSubCategorys([]);
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
          <a onClick={() => showUpdate(category)}>修改分类</a> &nbsp;
          {parentId === '0' ? <a onClick={() => showSubCategorys(category)}>查看子分类</a> : null}
        </span>
      ),
    },
  ];

  useEffect(() => {
    getCategorys();
  }, [parentId]);

  // card右侧
  const extra = (
    <Button type='primary' onClick={showAdd}><PlusOutlined />添加</Button>
  )

  // card左侧
  const title = parentId === '0' ? '一级分类列表' : (
    <span className='category-title'>
      <Button type='link' style={{ width: 105 }} onClick={showCategorys}>一级分类列表</Button>
      <ArrowRightOutlined style={{ paddingRight: 5 }} />
      <span>{parentName}</span>
    </span>
  )

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
      <Modal title="添加分类" open={showStatus === 1} onOk={addCategory} onCancel={handleCancel} destroyOnClose>
        <AddForm categorys={categorys} parentId={parentId} ref={inputAddCategory} />
      </Modal>
      <Modal title="更新分类" open={showStatus === 2} onOk={updateCategory} onCancel={handleCancel} destroyOnClose>
        <UpdateForm categoryName={updateCategoryObj?.name} ref={inputCategoryName} />
      </Modal>
    </Card>
  )
}
