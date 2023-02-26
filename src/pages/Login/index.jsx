import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './index.css'
import logo from '../../assets/image/logo.jpg'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';

export default function Login() {
  let navigate = useNavigate()
  async function onFinish(values) {
    const { username, password } = values;
    const result = await reqLogin(username, password);
    if (result.status === 0) { // 登陆成功
      message.success('登陆成功');
      const user = result.data;
      memoryUtils.user = user;  // 保存到内存中
      storageUtils.saveUser(user); // 保存到local中
      navigate('/', { replace: true })
    } else {
      message.error(result.msg);
    }
  };


  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };
  // 对密码自定义验证
  function validatePwd(rule, value, callback) {
    if (!value) {
      callback('密码必须输入');
    } else if (value.length < 4) {
      callback('密码长度小于4');
    } else if (value.length > 12) {
      callback('密码长度大于12');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback();
    }
  }

  // 如果用户已经登录，自动跳转到管理界面
  const user = memoryUtils.user;
  if (user._id) {
    return <Navigate replace to='/'/>
  }


  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            // 声明式验证：直接使用别人定义好的验证规则进行验证
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入用户名',
              },
              {
                min: 4,
                message: '用户名至少4位',
              },
              {
                max: 12,
                message: '用户名至多12位',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名必须是英文、数字或下划线组成',
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                validator: validatePwd,
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 9,
              span: 16,
            }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>

    </div>
  )

}
