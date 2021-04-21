### 需求分析、API说明
```
1. 根据客户端参数（状态/页码）查询人物列表
2. 实现新增任务功能（名称/截止日期/内容）
3. 实现编辑功能：根据客户端传传来的任务对象（已经存在的数据）、进行编辑（名称/截止日期/内容/ID）
4. 删除一个任务（ID）
5. 修改任务状态（ID/状态 -- 待办/完成）
```

### 数据库的初始化
```
1. 创建一个数据库（可视化工具：Navicat Premium）
    数据库名: todo_development
    字符集: utf8mb4
    排序规则: utf8mb4_croatian_ci
2. 使用 `sequelize cli` 初始化项目的数据库配置信息
    `npx sequelize init`
3. 生成模型文件
    1. migrate文件
    2. model 文件
    `npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string`
4. 持久化模型对应的[数据库表]
    `npx sequelize db:migrate`
```

### API里面具体使用ORM模型

# Sequelize 介绍和使用 https://www.sequelize.com.cn/core-concepts/getting-started
https://www.sequelize.com.cn/other-topics/migrations

* 我们在操作数据库的时候需要写很多的sql，如果我们在编程的时候去写sql会有很多问题: 
1. sql变的很难维护，因为sql是很复杂的
2. 写sql本身也是一个很耗时间的工作

* 所有就会有一些库ORM对象模型 -- sequelize就是其中一种
它会把数据库里面的表，通过对象的方式抽出来，然后通过对应的语言进行关联，所有的操作对这个对象就可以了


### 初始化
```
> npx sequelize-cli init # 初始化一下cli
```
初始化完成会生成几个文件
* config
* migrations 数据库迁移文件
* models 跟数据库表关联
* seeders 初始化脚本

```
> npx sequelize-cli model:generate --name User --attributes name:string #快速创建一个模型
> npm install --save mysql2 # ORM和mysql中间的驱动
> npx sequelize-cli db:migrate # 在数据库中创建一个表
```

### 安装mysql https://dev.mysql.com/doc/refman/8.0/en/installing.html

### mac 方式

```
> brew install mysql # 安装
> brew list | grep mysql # 查看是否安装好
> brew services list # 查看有哪些服务
> brew services start mysql # 启动mysql
> brew services stop mysql # 停止mysql
```

* 新建完的mysql没有密码，需要进去设置

```
> mysql -u root # 回车
```

### mysql 基本操作

```
mysql> show databases; # 查看有哪些数据库、⚠️要分号结尾;
mysql> use mysql_database; # 选择要用的数据库;
mysql> show tables; # 查看有哪些表;
mysql> select * from user; # 查看表里所有的数据;
mysql> select count(*) from user; # 查看一共多少条数据;
mysql> quit; # 退出mysql;
```

```
1. mysql是结构化数据库中的一种
2. mysql是一种服务、提供数据存放的服务
  --> 数据库: 划分存储区域
    --> table: js对象数组
```

* 创建 MySQL 数据库时指定字符集和校对规则 http://c.biancheng.net/view/2413.html

```
mysql> CREATE DATABASE IF NOT EXISTS test_db_char DEFAULT 
-> CHARACTER SET utf8mb4 
-> DEFAULT COLLATE utf8mb4_croatian_ci;
```
#### 删除表全部数据和表结构，立刻释放磁盘空间，不管是 Innodb 和 MyISAM;
mysql> drop table table_name

