const exp = require('express');
const app = exp();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const test = require('./Routes/test.routes.js');
const { connectDB, corsOptions } = require('./Config/config');
const { TryCatch } = require('./Utils/utility');

const { errorMiddleware } = require('./MiddleWares/error.js');

//import router of slot
const userRoute = require("./Routes/user.routes.js");
const lectureRoute = require("./Routes/lecture.routes.js");
const roomRoute = require("./Routes/room.routes.js");
const yearRoute = require("./Routes/year.routes.js");
const streamRoute = require("./Routes/stream.routes.js");
const professorRoute = require("./Routes/professor.routes.js");
const subjectRoute = require("./Routes/subject.routes.js");
const divisionRoute = require("./Routes/division.routes.js");
const calendarRoute = require("./Routes/calendar.routes.js");
const shiftRoute = require("./Routes/shift.routes.js");
const timeSlotRoute = require('./Routes/timeSlot.routes.js');


require('dotenv').config({
    path: './.env',
});


// const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 8000;
const envMode = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "PRODUCTION";
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
app.use("/api/v1/college", lectureRoute);
app.use('/api/v1/college', timeSlotRoute); //middleware to use slot router using REST APi
app.use('/api/v1/college', yearRoute); //middleware to use year router using REST APi
app.use('/api/v1/college', streamRoute); //middleware to use stream router using REST APi
app.use('/api/v1/college', professorRoute); //middleware to use professor router using REST APi
app.use('/api/v1/college', subjectRoute); //middleware to use subject router using REST APi
app.use('/api/v1/college', roomRoute); //middleware to use classroom router using REST APi
app.use('/api/v1/college', divisionRoute); //middleware to use division router using REST APi
app.use('/api/v1/college', calendarRoute);  //middleware to use calendar router using REST APi
app.use('/api/v1/college', shiftRoute);    //middleware to use shift router using REST APi

const start = TryCatch(async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`Server is running on port- http://localhost:${port}/api/v1/test... in ${envMode} mode`);
    })
})

start();

app.use(errorMiddleware);