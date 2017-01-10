var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
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
}];

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

	var found ;
	todos.forEach(function(todo){
		if(todo.id === todoId){
			found = todo;
		}
	});
	if(found){
		res.json(found);
	}else {
		res.status(404).send();
	}

})

app.listen(PORT, function(){
	console.log('Express listenning on port ' + PORT + '!');
});
