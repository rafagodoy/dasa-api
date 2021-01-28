const getServer = () => {
    if (process.env.NODE_ENV !== "production") {
        return "http://localhost:3003";
    } else {
        return "http://localhost";
    }
};

const serverTests = getServer();

export { serverTests };
