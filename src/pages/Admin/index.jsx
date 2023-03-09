import { React } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Navigate, Route } from 'react-router-dom';
import { Routes } from 'react-router'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../Home';
import Category from '../Category';
import Role from '../Role';
import User from '../User';
import Product from '../Product';
import Bar from '../Chart/bar';
import Line from '../Chart/line';
import Pie from '../Chart/pie';



const { Footer, Sider, Content } = Layout;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: 'black',
  backgroundColor: 'white',
  margin: 20,
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
export default function Admin() {

  const shouldRedirect = true;

  const user = memoryUtils.user;
  if (!user || !user._id) {
    // 自动跳转到登录（在render（）中
    return shouldRedirect && <Navigate replace to="/login" />
  }
  return (
    <Layout style={{ height: '100%' }}>
      <Sider style={siderStyle}>
        <LeftNav />
      </Sider>
      <Layout>

        <Header />

        <Content style={contentStyle}>
          <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/category' element={<Category />}></Route>
            <Route path='/product/*' element={<Product />}></Route>
            <Route path='/role' element={<Role />}></Route>
            <Route path='/user' element={<User />}></Route>
            <Route path='/charts/bar' element={<Bar />}></Route>
            <Route path='/charts/line' element={<Line />}></Route>
            <Route path='/charts/pie' element={<Pie />}></Route>
            {/* 重定向 */}
            <Route path='/*' element={<Navigate replace to='/home' />}></Route>
          </Routes>
        </Content>

        <Footer style={footerStyle}>推荐使用谷歌浏览器， 可以获得更加页面操作体验</Footer>

      </Layout>
    </Layout>
  )
}
