import React from 'react'
import { Form, Input, Select } from 'antd';
import { nanoid } from 'nanoid';
const { Option } = Select;


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

// 添加分类的form组件
function AddForm(props, ref) {
    const [form] = Form.useForm();
    const { categorys, parentId } = props;

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            style={{
                maxWidth: 600,
            }}
            ref={ref}
        >
            <Form.Item
                name="parentId"
                label="所属分类"
                rules={[
                    {
                        required: true,
                    },
                ]}
                initialValue={parentId}
            >
                <Select
                    placeholder="请选择所属分类"
                    allowClear
                >
                    <Option key={nanoid()} value="0">一级分类</Option>
                    {
                        categorys.map((item) => <Option key={nanoid()} value={item._id}>{item.name}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="categoryName"
                label="分类名称"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder='请输入分类名称' />
            </Form.Item>
        </Form>
    )
}
export default React.forwardRef(AddForm);