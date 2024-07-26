const exp = require('express');
const app = exp();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const test = require('./Routes/test.route');
const { connectDB, corsOptions } = require('./Config/config');
const { TryCatch } = require('./Utils/utility');
const bodyParser = require('body-parser');

const userRoute = require("./Routes/user");
const lectureRoute = require("./Routes/lecture");

//import router of slot
const slotRoute = require('./Routes/slot.route');


require('dotenv').config({
    path: './.env',
});


// const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// connectDB(mongoURI);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//routes
app.get('/', (req, res)=>{
    res.send('Node Server is working...');
})

app.use('/api/v1/test', test);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/college", lectureRoute);
app.use('/api/v1/college', slotRoute); //middleware to use slot router using REST APi

const start = TryCatch(async () => {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is running on port- http://localhost:${port}/api/v1/test...`);
        })
})

start();
