const exp = require('express');
const app = exp();
const test = require('./Routes/test.route');


app.use(exp.json());
//routes
app.get('/', (req, res)=>{
    res.send('Node Server is working...');
})

app.use('/api/v1/test', test);

const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running on port- http://localhost:${port}/api/v1/test...`);
})