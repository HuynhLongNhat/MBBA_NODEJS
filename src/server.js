require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import apiRoutes from "./routes/api"
import { configCors } from "./config/cors";
const app = express();
const PORT = process.env.PORT || 8888;

//config cors 
configCors(app)


//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// api routes 
apiRoutes(app)


// test connection db
// connection();

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log("jwt backend is running on the port =  " + PORT);
});
