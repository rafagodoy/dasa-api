const getServer = () => {
    return process.env.NODE_SERVER;
};

const serverTests = getServer();

export { serverTests };
