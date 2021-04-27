## 后端启动

1. 安装依赖 npm i

2. 安装mysql并启动mysql

3. 在数据库创建一个库
```
mysql> CREATE DATABASE IF NOT EXISTS test_db_char DEFAULT 
-> CHARACTER SET utf8mb4 
-> DEFAULT COLLATE utf8mb4_croatian_ci;
```

4. 在db目录下修改config.json，修改数据库信息

5. 进入db目录下面，使用下面命令 创建数据表
> npx sequelize-cli db:migrate

6. 在根目录下面使用下面命令，启动后端服务， 这样接口的api就可以使用了
> npm start

## 前端(umi)

1. 进入myapp中，安装依赖npm i，然后npm start
