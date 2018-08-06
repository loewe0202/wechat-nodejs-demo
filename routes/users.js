var express = require('express');
var router = express.Router();
var configs = require('../config.json')
var request = require('request');
var mysql = require('../mysql/UserService.js')


/* GET users listing. */
router.get('/login', function(req, res, next) {

  var code = req.query.code;
  var appSecret = configs.appSecret;
  var appId = configs.appId;

  request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`, function (error, response, body) {
    if (error) {
      throw new Error(`[查询用户信息失败]，\n${error}`)
    }
    console.log('body:', body); 

    // 最常见的错误： {"errcode":40029,"errmsg":"invalid code, hints: [ req_id: 07422030 ]"}
    var data = JSON.parse(body);

    if (data.errcode == 40029) {
      throw new Error(`[查询用户信息失败]，\n${data.errmsg}`)
    }

    /*
    {"session_key":"7MdWP\/73****s5TxduM4PU0A==",
    "expires_in":7200,
    "openid":"**",
    "unionid":"**"}
    */
    mysql.saveUserInfo(data)

  });

  res.send('respond with a resource');

});

module.exports = router;
