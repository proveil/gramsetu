import express from "express"
import "dotenv/config"
import FancyText from "./utils/FancyText.js";
import ConnectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import AuthRoute from "./Routes/auth.route.js"
import NewsRoute from "./Routes/news.route.js"
import EmergencyRoute from "./Routes/emergency.route.js"
import BookRoute from "./Routes/book.route.js"
import GSchemeRoute from "./Routes/GScheme.route.js"
import ESchemeRoute from "./Routes/EScheme.route.js"
import TutorialRoute from "./Routes/tutorial.route.js"
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  credentials: true
};

app.use(
  "/storage",
  express.static(path.join(process.cwd(), "..", "storage"))
);

app.use(express.static(path.join(process.cwd(), "../gui/dist")));

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRoute);
app.use("/api/news",NewsRoute);
app.use("/api/emergency",EmergencyRoute);
app.use("/api/books",BookRoute);
app.use("/api/gov-schemes",GSchemeRoute);
app.use("/api/eschemes",ESchemeRoute);
app.use("/api/tutorials",TutorialRoute);



app.use((req, res) => {
  res.sendFile(path.join(process.cwd(), "../gui/dist/index.html"));
});
app.listen(PORT, async ()=>{
    FancyText();
    await ConnectDB();
    console.log(`\n\nUSERNAME: ${process.env.USERNAME}\nCODE EDITOR: ${process.env.TERM_PROGRAM}\n\nNetwork:\nLocal-Host: http//localhost:${PORT}`)
})