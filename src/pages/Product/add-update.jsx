import {
    Form,
    Input,
    Card, 
    Button
} from 'antd';
import React, { useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
const { TextArea } = Input;



export default function ProductAddUpdate() {
    const navigate = useNavigate();
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };


    const title = (
        <span>
            <Button type='link' onClick={() => navigate(-1)} style={{ width: 40 }}>
                <ArrowLeftOutlined style={{ color: '#7DBCEA' }} />
            </Button>
            <span>添加商品</span>
        </span>
    )
    return (
        <Card title={title}>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label='商品名称'>
                    <Input placeholder='请输入商品名称'/>
                </Form.Item>
                <Form.Item label="商品描述">
                    <TextArea placeholder='请输入商品描述' autoSize />
                </Form.Item>
                <Form.Item label='商品价格'>
                    <Input type='number' placeholder='请输入商品价格' addonAfter="元"/>
                </Form.Item>
                <Form.Item label='商品分类'>
                    <Input placeholder='请输入商品价格' addonAfter="元"/>
                </Form.Item>
                <Form.Item label='商品详情'>
                    <Input/>
                </Form.Item>
                <Form.Item label='商品图片'>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary'>提交</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
