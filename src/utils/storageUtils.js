/**
 * 进行local数据存储的管理模块
 */
const USER_KEY = 'user_key'
function saveUser(user)  {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
}

function removeUser() {
    localStorage.removeItem(USER_KEY);
}

const storageUtils =  {
    saveUser,
    getUser,
    removeUser,
}
export default storageUtils;