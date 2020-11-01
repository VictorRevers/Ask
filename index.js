const express =  require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database');
const Ask = require('./database/Ask');
const Answer = require('./database/Answer');

connection.authenticate().then(()=>{
    console.log('DB conectada!');
}).catch((msgErro)=>{
    console.log(msgErro);
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res)=>{
    Ask.findAll({ raw: true, order: [
        ['id','DESC']
    ] }).then(questions =>{
        res.render('index',{
            questions: questions
        });
    });
   
});

app.get('/ask', (req, res)=>{
    res.render('ask');
});


app.post('/savequestion', (req, res)=>{
    var title = req.body.title;
    var description = req.body.description;
    Ask.create({
        title: title,
        description: description
    }).then(()=>{
        res.redirect('/');
    });
});

app.get('/question/:id', (req, res)=>{
    var id = req.params.id;
    Ask.findOne({
        where: {id: id},
    }).then(question =>{
        if(question != undefined){
            Answer.findAll({
                where: {questionId: question.id},
                order:[ 
                    ['id', 'DESC'] 
                ]
            }).then(answers =>{
                res.render('question',{
                    question: question,
                    answers:answers
                });
            });
        }else{
            res.redirect('/');
        }
    });

});

app.post('/answer', (req, res)=>{
    var body = req.body.body;
    var questionId= req.body.question;
    Answer.create({
        body: body,
        questionId: questionId
    }).then(()=>{
        res.redirect(`/question/${questionId}`);
    })
});

app.listen(8080, ()=>{
    console.log("App rodando!");
});

