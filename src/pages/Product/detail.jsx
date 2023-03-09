import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import Item from 'antd/es/list/Item';
import React from 'react'
import './css/product.css'
export default function ProductDetail() {
    const title = (
        <span>
            <ArrowLeftOutlined style={{ paddingRight: 5 }} />
            <span>商品详情</span>
        </span>
    )
    const data = [
        <Item>
            <span className='left'>商品名称：</span>
            <span>联想123</span>
        </Item>,
        <Item>
            <span className='left'>商品描述：</span>
            <span>联想123</span>
        </Item>,
        <Item>
            <span className='left'>商品价格：</span>
            <span>联想123</span>
        </Item>,
        <Item>
            <span className='left'>所属分类：</span>
            <span>联想123</span>
        </Item>,
        <Item>
            <span className='left'>商品图片：</span>
            <img src="https://wx1.sinaimg.cn/mw690/cfb6bb89ly1hbo1418u3hj21400u00xc.jpg" alt=""/>
        </Item>,
        <Item>
            <span className='left'>商品详情：</span>
            <span dangerouslySetInnerHTML={{__html: '<h1 style="color: red">联想123</h1>'}}>
            </span>
        </Item>,

    ];
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
