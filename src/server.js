import app from "./app";

const server = app.listen(process.env.PORT, () => {
    process.stdout.write(`Servidor iniciado na porta ${process.env.PORT}\r\n`);
});

const startGracefulShutdown = () => {
    console.log("Starting shutdown of express...");

    server.close(function () {
        console.log("Express shut down.");
        process.exit(0);
    });
};

process.on("SIGTERM", startGracefulShutdown);
process.on("SIGINT", startGracefulShutdown);
