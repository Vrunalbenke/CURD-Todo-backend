const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

// app.use(cors({origin: true, credentials: true}));

let todoList = [];

app.get('/', (req,res) => {
    console.log('req coming from frontend')
    res.send(todoList);
})

app.post('/AddTodo',(req,res) =>{
    console.log(req.body)
    let newTodo = req.body
    todoList.unshift(newTodo);
    console.log(todoList)
    res.send({
        status:200,
        message: "Todo Added"
    })
})

app.put('/EditTodo', (req, res) => {
    let edit = req.body;
    todoList = todoList.map((item) => {
        if(edit.id == item.id){
            item.task = edit.task
        }
        return item;
    })
    res.send({
        status: 200,
        message: "Todo Edited"
    })
})

app.delete('/DeleteTodo', (req,res) => {
    let deleteID = req.body;
    // let deleteID = req.body.id;
    console.log(req.body)
    todoList = todoList.filter((item) => {
        return item.id !== deleteID.id;
    })
    res.send({
        status: 200,
        message: "Todo Deleted"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })