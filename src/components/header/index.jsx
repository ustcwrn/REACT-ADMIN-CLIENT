import './index.css'
import { reqSearchWeather } from '../../api'
import React, { useEffect, useState } from 'react'
import formateDate from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { useLocation, useNavigate } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import storageUtils from '../../utils/storageUtils'



export default function Header() {
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
  const [weather, setWeather] = useState('');
  const navigate = useNavigate();
  let intervalId = '';
  const getTime = () => {
    intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      setCurrentTime(currentTime);
    }, 1000);
  }

  const getWeather = async () => {
    const res = await reqSearchWeather();
    const weather = res.lives[0].weather;
    setWeather(weather);
  }
  // 在第一次render（）之后执行， 一般在此进行异步操作： 发ajax请求、启动定时器
  // componentDidMount() {
  //   this.getTime();
  //   this.getWeather();
  // }
  // const {currentTime, weather} = this.state;

  const GetTitle = () => {
    // useLocation得到当前请求路径
    let location = useLocation();
    const path = location.pathname;
    // eslint-disable-next-line no-unused-vars
    let title = '';
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const child = item.children.find(item => item.key === path);
        if (child) {
          title = child.title;
        }
      }
    })
    return title;
  }

  // 退出登录
  const logOut = () => {
    // 显确认框
    Modal.confirm({
      // title: '确定退出？',
      icon: <ExclamationCircleFilled />,
      content: '确定退出？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        // 删除保存的user数据
        storageUtils.removeUser();
        memoryUtils.user = {};
        // 跳转到login
        navigate('/login', { replace: true })
      },
      onCancel() {
      },
    });
  }

  // 充当componentDidMount()
  useEffect(() => {
    const firstGet = () => {
      getTime();
      getWeather();
    };
    firstGet();
    return function cleanup() {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const username = memoryUtils.user.username;

  const title = GetTitle();
  return (
    <div className='header' style={{ backgroundColor: '#7dbcea' }}>
      <div className='header-top'>
        <span>欢迎，{username}</span>
        <Button onClick={logOut} type="link">退出</Button>
        {/* <a href="javascript" onClick={logOut}>退出</a> */}
      </div>
      <div className='header-buttom'>
        <div className='header-buttom-left'>{title}</div>
        <div className='header-buttom-right'>
          <span>{currentTime}</span>
          <img src="https://weather.cma.cn/static/img/w/icon/w1.png" alt="weather" />
          <span>{weather}</span>
        </div>
      </div>
    </div>
  )
}
