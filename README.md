# React File-X Demo

[使用 React 制作 File-X 客户端系列教程](http://new.featapi.com/guides/tutorials/file-x-demo/) 的代码仓库

## 项目目的

- 演示 File-X 模块的功能
- 指引入门开发者开发一个简单的单页面应用

## 功能点

- 查阅公共事件流
- 查阅用户事件列表
- OAuth 2.0 implicit 授权流程
- 查看当前用户的事件列表
- 创建/发布事件
- 删除事件
- 添加、修改、删除、回复评论


## 本地开发


1. 拉去仓库
   
```bash
$ git clone https://github.com/feat/filex_example.git
```

2. 安装依赖

```bash
$ npm install
```

3. 在 feat.com 上注册应用，可参考：[OAuth 2.0 Implicit Grant Type - 创建 OAuth 应用](http://new.featapi.com/guides/tutorials/file-x-demo-oauth-2-0-implicit-grant-type/#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E6%8E%88%E6%9D%83%E7%9A%84%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C_%E2%80%94_%E5%88%9B%E5%BB%BAOAuth%E5%BA%94%E7%94%A8)

4. 创建 `.env.local` 文件

```bash
$ cp .env.example .env.local
```

在 `.env.local` 中，填入你的 Feat Oauth 应用的 Client ID。

5. 启动项目

```bash
$ npm start
```

**注意** 注意通过局域网地址进行访问。否则，授权过程中会出现 `403` 错误

## 参与贡献

如果发现代码中有不对的地方，欢迎创建 issue 或者直接修改代码后提交 pull request 。谢谢