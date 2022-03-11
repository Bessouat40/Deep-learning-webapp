const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

const { spawn = () => null } = require('child_process');

//const command = spawn('python', ["./python/bonjour.py", 'moi']);
//const command = spawn('python', ["./python/exe.py"]);

let result = '';

command.stdout.on('data', function (data) {
  result += data.toString();
});

app.post('/express_backend', (req, res) => {
  const command = spawn('python', ["./python/prediction.py", res[2]]);
  let result = '';

  command.stdout.on('data', function (data) {
    result += data.toString();
  });
  res.send(result)
  });

  //res.send({ express: result }); 

/*app.get('/express_backend', (req, res) => { 
  res.send({ express: result }); 
}); */

app.listen(port, () => console.log(`Listening on port ${port}`));