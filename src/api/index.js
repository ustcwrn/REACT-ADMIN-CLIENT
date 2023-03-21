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
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId }, 'GET');

//  添加分类
export const reqAddCategorys = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, 'POST');

//  更新分类
export const reqUpdateCategorys = (categoryName, categoryId) => ajax('/manage/category/update', { categoryName, categoryId }, 'POST');


// 获取商品分页列表 
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize })

// 搜索商品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => ajax('/manage/product/search', { [searchType]: searchName, pageNum, pageSize })


// 获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId })

// 更新商品的状态
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status }, 'POST');

// 删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST');

// 获取所有角色的列表
export const reqRoles = () => ajax('manage/role/list');

// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST');

// 更新角色
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST');

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')