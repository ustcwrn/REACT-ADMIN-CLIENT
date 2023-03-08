/* 包含应用中所有接口请求的函数模块 */
import ajax from "./ajax";
// 只需要填入key和你的城市信息，已经标记出来了
import axios from "axios";
// 设置跨域请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');


// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', { user }, 'POST');

// 天气查询
async function getCity() {
    const params = {
        key: '0886fd52c838c9b143522d2cfd70b0e8', // 你的key
    };
    let res = await ajax('https://restapi.amap.com/v3/ip?parameters', params, 'GET');
    return res.adcode;
}

export const reqSearchWeather = async () => {
    const adcode = await getCity();
    const params = {
        key: '0886fd52c838c9b143522d2cfd70b0e8', // 你的key
        city: adcode,
        extensions: 'base'
    };
    let res = await ajax('https://restapi.amap.com/v3/weather/weatherInfo?parameters', params, 'GET');
    return res;
}

//  获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId}, 'GET');

//  添加分类
export const reqAddCategorys = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST');

//  更新分类
export const reqUpdateCategorys = (categoryName, categoryId) => ajax('/manage/category/update', {categoryName, categoryId}, 'POST');
