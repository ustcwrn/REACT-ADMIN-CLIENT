/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Input, message, Select, Table } from 'antd'
import { Option } from 'antd/es/mentions';
import React, { useState, useEffect } from 'react'
import './css/product.css'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';

// product的默认子路由组件
export default function ProductHome() {
    const [products, setProducts] = useState();
    const [columns, setColumns] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('productName');
    const navigate = useNavigate();
    const [nowPageNum, setNowPageNum] = useState(1);

    const title = (
        <span>
            <Select value={searchType} style={{ width: '150px' }} onChange={(value) => setSearchType(value)}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input
                placeholder='关键字'
                style={{ width: '200px', margin: '0 15px' }}
                onChange={(event) => setSearchName(event.target.value)} >
            </Input>
            <Button type='primary' onClick={() => getProducts(1)}>搜索</Button>
        </span>
    );
    const extra = (
        <Button type='primary' style={{ width: 110 }} onClick={() => navigate('/product/addupdate')}><PlusOutlined />添加商品</Button>
    )

    // 初始化列的数组
    const initColumns = () => {
        setColumns([
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price,
            },
            {
                width: 50,
                title: '状态',
                render: (product) => {
                    const {status, _id} = product;
                    const newStatus = status === 1 ? 2 : 1;
                     return (
                        <span>
                            <Button type='primary'
                                onClick={() => updateStatus(_id, newStatus)}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <br />
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                },
            },
            {
                width: 50,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <Button type='link' onClick={() => navigate('/product/detail', { state: product })}>详情</Button>
                            <Button type='link' onClick={123}>修改</Button>
                        </span>
                    )
                },
            },
        ])
    }

    const getProducts = async (pageNum) => {
        setNowPageNum(pageNum);
        let res;
        setLoading(true);
        if (searchName) {
            res = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType)
        } else {
            res = await reqProducts(pageNum, PAGE_SIZE);
        }
        setLoading(false);
        if (res.status === 0) {
            const { total, list } = res.data;
            setProducts(list);
            setTotal(total);
        }
    }
    // 更新指定商品的状态
    const updateStatus = async (productId, status) => {
        const res = await reqUpdateStatus(productId, status);
        if (res.status === 0) {
            message.success('更新商品成功！');
            getProducts(nowPageNum);
        }
    }
    
    useEffect(() => {
        initColumns();
        getProducts(nowPageNum);
    },[nowPageNum])

    return (
        <Card title={title} extra={extra} className='home-title'>
            <Table
                rowKey='_id'
                bordered
                dataSource={products}
                columns={columns}
                pagination={{
                    onChange: getProducts,
                    total,
                    defaultPageSize: PAGE_SIZE
                }}
                loading={loading}
            >
            </Table>
        </Card>
    )
}
