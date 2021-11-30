## 项目初始化
# 1. npm 初始化
```
npm init
```
生成package.json文件。
~记录项目的依赖
# 2.git初始化
```
git init
```
生成.git 隐藏文件夹，git的本地仓库
.gitignore

# 3. 创建readme文件

## [2] 搭建项目
# 1. 安装koa 框架 
npm i koa

# 2.编写最基本的APP
创建src/main.js

# 3.测试
node src/main.js

## [3]项目基本优化
# 1.自动重启服务。
安装nodemon 工具  --save
npm i nodemon

# 2. 读取配置文件
安装 dotenv, 读取根目录中的 .env 文件， 将配置写到 process.env 中。

npm i dotenv

创建.env文件
APP_PORT = 3000

创建 src/config/config.default.js


## [4] 添加路由
路由： 根据不同的URL， 调用对应处理函数
# 1. 安装 koa-router 
npm i koa-router 

步骤：
1.导入包
2.实例化对象
3.编写路由
4.注册中间件

# 2. 编写路由
创建 src/router 目录，编写user.route.js

# 3. 改写 main.js

## [5] 目录结构优化
跟业务相关的
# 1. 将http 服务和app 业务拆分
创建src/app/index.js

# 2. 将路由和控制器拆分

路由： 解析 URL， 分发给控制器对应的方法

控制器： 处理不同的业务

创建controller/user.controller.js

## [6] 解析body 拆分service层
koa-body
1. 安装koa-body
npm i koa-body

2. 注册中间件
改写app/index.js 

const KoaBody = require('koa-body');
app.use(KoaBody());

3. 解析请求数据

改写 controller/user.controller.js

4. 拆分service 层
service 主要是做数据库处理的。
创建 src/service/user.service.js
```
class UserService {
  async createUser(user_name, password) {
    // todo: 写入数据库

    return '写入数据库成功';
  }
}

module.exports = new UserService();
```
## [7] 数据库操作
 sequelize 集成
 sequelize ORM 数据库工具
ORM： 对象关系映射

· 数据表映射（对应）一个对象
· 数据表中的数据行（记录）对应一个对象
· 数据表 字段对应对象的属性
· 数据表的操作对应对象的方法

安装：
npm install sequelize mysql2 --save 

# 3. 编写配置文件
.env

## [8] 创建user 模型
创建 src/model/use.mode.js








