const debug = require('debug')('wechat-nodejs-demo[AuthDbService]')
const uuidGenerator = require('uuid/v4')
const dayjs = require('dayjs')
const mysql = require('./index')

/**
 * 储存用户信息
 * @param {object} userInfo
 * @return {Promise}
 */
function saveUserInfo (userInfo) {
    const uuid = uuidGenerator()
    const create_time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const last_visit_time = create_time
    const open_id = userInfo.openid
    const session_key = userinfo.session_key
    
    const user_info = JSON.stringify(userInfo)

    console.log({
                uuid, 
                create_time, 
                last_visit_time, 
                open_id, 
                session_key, 
                user_info
            })

    // 查重并决定是插入还是更新数据
    return mysql('cSessionInfo').count('open_id as hasUser').where({
        open_id
    })
    .then(res => {
        console.log(res)
        if (res[0].hasUser) {
            // 如果存在用户则更新
            return mysql('cSessionInfo').update({
                last_visit_time, 
                session_key, 
                user_info
            }).where({
                open_id
            })
        } else {
            // 如果不存在用户则新建
            return mysql('cSessionInfo').insert({
                uuid, 
                create_time, 
                last_visit_time, 
                open_id, 
                session_key, 
                user_info
            })
        }
    })
    .then(() => ({
        userinfo: userInfo
    }))
    .catch(e => {
        throw new Error(`操作数据库失败，\n${e}`)
    })
}

/**
 * 通过 openid 获取用户信息
 * @param {string} openid openid
 */
function getUserInfoByOpenId (openId) {
    if (!openId) throw new Error('参数 openId 缺少')

    return mysql('cSessionInfo').select('*').where({ open_id: openId }).first()
}

module.exports = {
    saveUserInfo,
    getUserInfoByOpenId
}
