const express = require('express');
const bodyParser = require('body-parser');
const models = require('../db/models');

const app = express();

app.use(express.json()); // 处理express json
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false})); // 对url参数做encode
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})); // 对body参数做encode


// 1. 所有错误、http status === 500

/** 查询任务列表 */
app.get('/list/:status/:page', async(req, res, next) => {
    let {status, page} = req.params;
    let limit = 10;
    let offset = (page -1)*limit; // 偏移量
    let where = {};
    // if (status != -1) {
    //     where.status = status
    // }
    // 1. 状态 1:待办、2：完成、3: 删除、4：-1表示全部数据
    // 2. 分页的处理
    // 查询并且汇集总数
    let list = await models.Todo.findAndCountAll({
        // where,
        offset,
        limit
    })
    res.json({
        list,
        message: '查询成功'
    })
})

/** 创建一个TODO */
app.post('/create', async(req, res, next) => {
    try {
        let {name, deadline, content} = req.body; // req.body如果不做一些中间件处理是拿不到的 body-parser
        /** 数据持久化到数据库 */
        let todo = await models.Todo.create({
            name,
            deadline,
            content
        })
        res.json({
            todo,
            message: '任务创建成功'
        })
    } catch (error) {
        next(error) // 异常传递下去、被全局的err捕获到
    }

})

/** 修改一个TODO */
app.post('/listupdate', async(req, res, next) => {
    try {
        let {id,name, deadline, content, status} = req.body; // req.body如果不做一些中间件处理是拿不到的 body-parser
        let todo = await models.Todo.findOne({
            where:{
                id
            }
        })
        if (todo) {
            // 执行更新功能
            todo = await todo.update({
                name,
                deadline,
                content,
                status
            })
        }
        res.json({
            todo
        })
    } catch (error) {
        next(error)
    }
})

/** 
 * 修改一个TODO
 * update_status
 * */
app.post('/listupdatestatus', async(req, res, next) => {
    try {
        let {id, status} = req.body;
        let todo = await models.Todo.findOne({
            where: {
                id
            }
        })
        if (todo && status != todo.status) { // 不要用!== 因为body解析出来可能是字符串
            // 执行更新
           todo = await todo.update({
                status
            })
        }
        res.json({
            todo
        })
    } catch (error) {
        next(error)
    }
})

/** 
 * 删除
 * 
 * TODO:  这个路径写成/delete/:id就不好使了,/api/removeDate 也不好使
 * 不知道为什么第一个参数有什么规则
 */
app.post('/book', async(req, res, next) => {
    try {
        const { id } = req.body;
        let list = await models.Todo.destroy({
            where: {
                id
            }
        })
        if (list) {
            res.json({
                message: '删除成功'
            })
        } else {
            res.json({
                message: '删除失败'
            })
        }
    } catch (error) {
        next(error)
    }
})


app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.listen(3000, () => {
    console.log('succes')
})