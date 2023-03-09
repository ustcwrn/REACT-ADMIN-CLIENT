/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Input, Select, Table } from 'antd'
import { Option } from 'antd/es/mentions';
import React, { useState, useEffect } from 'react'
import './css/product.css'
import { PlusOutlined } from '@ant-design/icons';
import { reqProducts, reqSearchProducts } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';

// product的默认子路由组件
export default function ProductHome() {
    const [products, setProducts] = useState();
    const [columns, setColumns] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('productName');
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
        <Button type='primary' style={{ width: 110 }} onClick={123}><PlusOutlined />添加商品</Button>
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
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <br />
                            <span>在售</span>
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
                            <Button type='link' onClick={123}>详情</Button>
                            <Button type='link' onClick={123}>修改</Button>
                        </span>
                    )
                },
            },
        ])
    }

    const getProducts = async (pageNum) => {
        let res;
        setLoading(true);
        if (searchName) {
            res = await reqSearchProducts( pageNum, PAGE_SIZE, searchName, searchType )
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
    useEffect(() => {
        initColumns();
        getProducts(1);
    }, [])

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
