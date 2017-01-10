var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [/*{
	id: 1,
	decription: 'Meet mom in the parc',
	completed: false
},{
	id: 2,
	description: 'Go to market and buy food',
	completed: false
},{
	id: 3,
	description: 'Got every thinks about node-js',
	completed: true
}*/];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function(req, res){
	res.json(todos); //the res.json will convert the todos array into json and send back to the caller API
})

//GET /todo/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id,10);

	var found = _.findWhere(todos,{id: todoId});
	/*var found ;
	todos.forEach(function(todo){
		if(todo.id === todoId){
			found = todo;
		}
	});*/


	if(found){
		res.json(found);
	}else {
		res.status(404).send();
	}

});



//POST /todos
app.post('/todos', function(req, res) {
	//var body = req.body;

	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed)  || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	//set body.description to be trimed value
	body.description = body.description.trim();


	// add id field
	body.id = todoNextId;
	//push body into array
	/*todos.push({
		id: todoNextId,
		description: body.description,
		completed: body.completed
	});*/
	todos.push(body);

	todoNextId += 1;

	console.log('description: ' + body.description);
	res.json(body);
});

//DELETE /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(!matchedTodo){
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});

app.listen(PORT, function(){
	console.log('Express listenning on port ' + PORT + '!');
});
