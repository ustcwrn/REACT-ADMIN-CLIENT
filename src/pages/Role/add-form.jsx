import React from 'react'
import { Form, Input } from 'antd';


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

function AddForm(props, ref) {
    const [form] = Form.useForm();

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
                name="roleName"
                label="角色名称"
                rules={[
                    {
                        required: true, message: '请输入角色名称'
                    },
                ]}
            >
                <Input placeholder='请输入角色名称' />
            </Form.Item>
        </Form>
    )
}
export default React.forwardRef(AddForm);