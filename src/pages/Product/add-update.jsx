/* eslint-disable react-hooks/exhaustive-deps */
import {
    Form,
    Input,
    Card,
    Button,
    Cascader,
    message
} from 'antd';
import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { reqAddOrUpdateProduct, reqCategorys } from '../../api';
import PicturesWall from './pictures_wall';
import './css/product.css'
import RichTextEdit from './rich_text-edit';
const { TextArea } = Input;

// 实现componentWillMount()
const useComponentWillMount = func => {
    const willMount = useRef(true);

    if (willMount.current) {
        func();
    }
    willMount.current = false;
};
let title;
let isUpdate = false;
let product = {};


export default function ProductAddUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const parentId = '0';
    const [options, setOptions] = useState([]);
    const [componentSize, setComponentSize] = useState('default');
    const categoryIds = [];
    const picRef = useRef(null);
    let productDetail;

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useComponentWillMount(() => {
        product = location.state || {};
        isUpdate = product._id ? true : false;
        title = (
            <span>
                <Button type='link' onClick={() => navigate(-1)} style={{ width: 40 }}>
                    <ArrowLeftOutlined style={{ color: '#7DBCEA' }} />
                </Button>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )
    })

    const { pCategoryId, categoryId } = product;
    if (isUpdate) {
        // 商品为一级分类商品
        if (pCategoryId === '0') {
            categoryIds.push(pCategoryId);
        } else {
            categoryIds.push(pCategoryId);
            categoryIds.push(categoryId);
        }
    }

    const initOptions = async categorys => {
        // 根据categorys生成options数组
        const options = categorys.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: false,
        }))

        // 如果是一个二级分类商品的更新
        if (isUpdate && pCategoryId !== '0') {
            // 获取对应的二级分类列表
            const subCategorys = await getCategorys(pCategoryId);
            //   生成二级下拉列表的options
            const childOptions = subCategorys.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true,
            }))
            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId)
            // 关联到一级的option上面
            targetOption.children = childOptions || [];
        }
        setOptions(options);
    }
    const getCategorys = async (parentId) => {
        const res = await reqCategorys(parentId);
        if (res.status === 0) {
            const categorys = res.data;
            // 如果是一级分类列表
            if (parentId === '0') {
                initOptions(categorys);
            } else {
                // 返回二级列表 
                return categorys;
            }
        }
    }

    const onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    const loadData = async (selectedOptions) => {
        // 得到选择的option对象
        const targetOption = selectedOptions[0];
        // 显示loading
        targetOption.loading = true;
        // 根据选中的分类，请求获取二级分类列表
        const subCategorys = await getCategorys(targetOption.value);

        // load options lazily
        // 模拟异步请求二级列表数据， 并更新
        setTimeout(() => {
            targetOption.loading = false;
            if (subCategorys && subCategorys.length > 0) {
                targetOption.children = subCategorys.map(item => ({
                    value: item._id,
                    label: item.name,
                    isLeaf: true,
                }))
            } else {
                targetOption.isLeaf = true;
            }
            // 更新options数组
            setOptions([...options]);
        }, 1000);
    };

    const onFinish = async (value) => {
        // 进行表单验证， 如果通过了，才发送请求
        // 1. 收集数据， 并封装成product对象
        const { productName: name, productDesc: desc, productPrice: price, productCategory: categoryIds } = value;
        let pCategoryId, categoryId;
        if (categoryIds.length === 1) {
            pCategoryId = '0';
            categoryId = categoryIds[0];
        } else {
            pCategoryId = categoryIds[0];
            categoryId = categoryIds[1];
        }
        let imgs = picRef.current.fileList.map(item => item?.response?.data?.name);
        let detail = productDetail;
        const productParam = { name, desc, price, imgs, detail, pCategoryId, categoryId };

        // 如果是更新， 添加_id
        if (isUpdate) {
            productParam._id = product._id;
        }
        // 2. 调用接口请求函数去添加/更新
        const res = await reqAddOrUpdateProduct(productParam);
        // 3. 根据结果显示

        if (res.status === 0) {
            message.success(`${isUpdate ? '更新' : '添加'}商品成功！`);
        } else {
            message.success(`${isUpdate ? '更新' : '添加'}商品失败！`);
        }
    }
    const validatePrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback(); //验证通过
        } else {
            callback('价格必须大于0');
        }
    }

    const setDetail = (detail) => {
        productDetail = detail;
    }

    useEffect(() => {
        getCategorys(parentId);
    }, [])

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
                onFinish={onFinish}
            >
                <Form.Item label='商品名称'
                    name="productName"
                    initialValue={product.name || ''}
                    rules={[
                        { required: true, message: '必须输入商品名称' }
                    ]}

                >
                    <Input placeholder='请输入商品名称' />
                </Form.Item>
                <Form.Item label="商品描述"
                    initialValue={product.desc || ''}
                    name="productDesc"
                    rules={[
                        { required: true, message: '必须输入商品描述' }
                    ]}
                >
                    <TextArea placeholder='请输入商品描述' autoSize />
                </Form.Item>
                <Form.Item label='商品价格'
                    initialValue={product.price || ''}
                    name="productPrice"
                    rules={[
                        { required: true, message: '必须输入商品价格' },
                        { validator: validatePrice }
                    ]}
                >
                    <Input type='number' placeholder='请输入商品价格' addonAfter="元" />
                </Form.Item>
                <Form.Item label='商品分类'
                    name="productCategory"
                    initialValue={categoryIds || []}
                    rules={[
                        { required: true, message: '必须输入商品分类' }
                    ]}
                >
                    <Cascader
                        options={options}  // 需要显示的列表的数据数组
                        loadData={loadData} // 当选择某个表项，加载下一级列表的监听回调
                        onChange={onChange}
                        changeOnSelect
                    />
                </Form.Item>
                <Form.Item label='商品图片'
                    name="productPic">
                    <div className='add-update-pictureswall'>
                        <PicturesWall imgs={product.imgs} ref={picRef} />
                    </div>
                </Form.Item>
                <Form.Item label='商品详情'
                    initialValue={product.detail || ''}
                    name="productDetail">
                    <div className='add-update-detail'>
                        <RichTextEdit setDetail={setDetail} detail={product.detail} />
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>提交</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
