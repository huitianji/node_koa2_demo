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
安装nodemon 工具
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

