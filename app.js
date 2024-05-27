const exp = require('express');
const app = exp();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const test = require('./Routes/test.route');
const { connectDB, corsOptions } = require('./Config/config');
const { TryCatch } = require('./utils/utility');

const userRoute = require("./Routes/user");

require('dotenv').config({
    path: './.env',
});


// const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// connectDB(mongoURI);

app.use(exp.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//routes
app.get('/', (req, res)=>{
    res.send('Node Server is working...');
})

app.use('/api/v1/test', test);
app.use("/api/v1/user", userRoute);

const start = TryCatch(async () => {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is running on port- http://localhost:${port}/api/v1/test...`);
        })
})

start();
