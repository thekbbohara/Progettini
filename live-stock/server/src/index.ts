import express, { type Express } from "express";
import { Server, type Socket } from "socket.io";
import { createServer, type Server as ServerType } from "http";
// import cors from "cors";
import cors, { CorsOptions } from "cors";
import { configDotenv } from "dotenv";
import scrapper from "./scapper";
configDotenv();

const { PORT, HOSTNAME } = process.env;

// Initialize Express App
const app: Express = express();
const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

// Create HTTP Server
const httpServer: ServerType = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Replace with your frontend's URL in production
    methods: ["GET", "POST"],
  },
});

// Socket.IO Events
io.on("connection", async (socket: Socket) => {
  console.log("A user connected");

  // Custom event example
  await scrapper(socket);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Express Routes
app.get("/", (_, res) => {
  res.send("hello world!");
});

// Start Server
httpServer.listen(Number(PORT ?? 8080), HOSTNAME ?? "localhost", () => {
  console.log(
    `Server is running at http://${HOSTNAME ?? "localhost"}:${PORT ?? 8080}`,
  );
});
