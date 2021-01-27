import app from "./app";
import { Client } from "pg";

const server = app.listen(process.env.PORT, () => {
    process.stdout.write("Servidor iniciado na porta 80\r\n");
});

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

const startGracefulShutdown = () => {
    console.log("Starting shutdown of express...");

    server.close(function () {
        console.log("Express shut down.");
        process.exit(0);
    });
};

process.on("SIGTERM", startGracefulShutdown);
process.on("SIGINT", startGracefulShutdown);
