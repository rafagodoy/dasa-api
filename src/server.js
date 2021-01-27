import app from "./app";

const server = app.listen(8080, () => {
    process.stdout.write("Servidor iniciado na porta 3003\r\n");
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
