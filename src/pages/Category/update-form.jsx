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

// 添加分类的form组件
const UpdateForm = React.forwardRef((props, ref) => {
    const { categoryName } = props;
    const [form] = Form.useForm();
    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                name="note"
                label="分类名称"
                rules={[
                    {
                        required: true,
                        message: '分类名称必须输入'
                    },
                ]}
                initialValue={categoryName}
            >
                <Input  placeholder='请输入分类名称' ref={ref} />
            </Form.Item>
        </Form>
    )
}
)
export default UpdateForm;
