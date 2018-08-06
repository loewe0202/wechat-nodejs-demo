# wechat-nodejs-demo

nodejs demo for login、sms、mysql

## 依赖

基于 express

## 配置信息

放置到了 config.json 中，需要替换`你自己的信息`，内容如下：

```
{
    "appId": "*",
    "appSecret": "*",
    "mysql": {
        "host": "*",
        "port": 3306,
        "user": "root",
        "db": "test",
        "pass": "*",
        "char": "utf8mb4"
    }
}
```

## 安装依赖

> npm i

## 本地测试

> npm run start

## 部署线上

> pm2 start bin/www


