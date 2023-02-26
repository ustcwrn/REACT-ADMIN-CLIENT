// 能发送异步ajax请求的函数模块，封装axios库，函数的返回值是promise对象


import axios from "axios";
import { message } from "antd";
export default function ajax(url, data = {}, type = 'GET') {
    const res =  new Promise((resolve) => {
        let promise;
        // 1.执行异步aiax请求
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data,
            })
        } else {
            promise =  axios.post(url, data);
            console.log(promise);
        }
        promise.then((response) => {
            resolve(response.data);
        }).catch(error => {
            message.error('请求失败：' + error.message);
        })
    })
    console.log(res);
    return res;
}


// ajax('/login', {u sername: 'Tom', password: '12345'}, 'POST').then();


// // 添加用户
// ajax('/manage/user/add', {username: 'Tom', password: '12345', phone: '1234567890'}, 'POST').then();
