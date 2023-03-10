/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, List, Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
// import Item from 'antd/es/list/Item';
import React, { useState, useEffect } from 'react'
import './css/product.css'
import { reqCategory } from '../../api'
export default function ProductDetail() {
    const [cName1, setCname1] = useState(''); // 一级分类名称
    const [cName2, setCname2] = useState(''); // 二级分类名称
    const navigate = useNavigate();
    const location = useLocation();
    const { name, desc, price, detail } = location.state
    const title = (
        <span>
            <Button type='link' onClick={() => navigate(-1)} style={{ width: 40 }}>
                <ArrowLeftOutlined style={{ color: '#7DBCEA' }} />
            </Button>
            <span>商品详情</span>
        </span>
    )
    const data = [
        <span>
            <span className='left'>商品名称：</span>
            <span>{name}</span>
        </span>,
        <span>
            <span className='left'>商品描述：</span>
            <span>{desc}</span>
        </span>,
        <span>
            <span className='left'>商品价格：</span>
            <span>{price}</span>
        </span>,
        <span>
            <span className='left'>所属分类：</span>
            <span>{cName1+cName2}</span>
        </span>,
        <span>
            <span className='left'>商品图片：</span>
            <img src="https://wx1.sinaimg.cn/mw690/cfb6bb89ly1hbo1418u3hj21400u00xc.jpg" alt="" />
        </span>,
        <span style={{ display: 'flex' }}>
            <span className='left'>商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}>
            </span>
        </span>,

    ];

    useEffect(() => {
        // 执行一次
        const getCname = async () => {
            const { categoryId, pCategoryId } = location.state;
            if (pCategoryId === '0') {
                const res1 = await reqCategory(categoryId);
                setCname1(res1.data.name);
            } else {
                const res = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
                setCname1(res[0].data.name);
                setCname2(res[1].data.name);
            }
        };
        getCname();
    }, [])

    return (
        <Card
            title={title}
            className='product-detail'
        >
            <List
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
        </Card>
    )
}
