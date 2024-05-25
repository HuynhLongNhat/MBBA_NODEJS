require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import apiRoutes from "./routes/api"
import { configCors } from "./config/cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8888;

//config cors 
configCors(app)


//config body-parser

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// api routes 

app.use(cookieParser())
apiRoutes(app)


// test connection db
// connection();

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log("mbba backend is running on the port =  " + PORT);
});
