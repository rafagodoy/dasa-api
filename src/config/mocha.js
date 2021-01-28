const getServer = () => {
    return process.env.NODE_SERVER || "http://localhost:3003";
};

const serverTests = getServer();

export { serverTests };
