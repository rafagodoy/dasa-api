import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import { serverTests } from "../../src/config/mocha";
import chaiSubset from "chai-subset";
import faker from "faker";

chai.use(chaiHttp);
chai.use(chaiSubset);

const mockUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

const mockAnotherkUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

const mockUserToUpdate = {
    name: faker.name.findName(),
    email: faker.internet.email(),
};

const mockUserAuthenticated = {
    idUser: "",
    token: "",
};

let sessionUserSchema = {
    status: "",
    user: {
        id_users: "",
    },
};

describe("Integrations tests", () => {
    describe("Users", () => {
        describe("/POST", () => {
            it("should register a new user in database", () => {
                return chai
                    .request(serverTests)
                    .post("/users")
                    .send({ ...mockUser, password_confirm: mockUser.password })
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });

            it("should deny to duplicate emails in database", () => {
                return chai
                    .request(serverTests)
                    .post("/users")
                    .send({ ...mockUser, password_confirm: mockUser.password })
                    .then((res) => {
                        if (res.statusCode !== 403) {
                            throw new Error(chai.expect(res).have.status(403));
                        }

                        chai.expect(res).have.status(403);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });

            it("should register another user in database", () => {
                return chai
                    .request(serverTests)
                    .post("/users")
                    .send({ ...mockAnotherkUser, password_confirm: mockAnotherkUser.password })
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });

            it("should send a bad request when the format data request was wrong", () => {
                return chai
                    .request(serverTests)
                    .post("/users")
                    .send({
                        name: faker.name.findName(),
                        password: faker.internet.password(),
                    })
                    .then((res) => {
                        if (res.statusCode !== 400) {
                            throw new Error(chai.expect(res).have.status(400));
                        }

                        chai.expect(res).have.status(400);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });

        describe("/SESSIONS", () => {
            it("should get a user session with token and id in database", () => {
                return chai
                    .request(serverTests)
                    .post("/users/sessions")
                    .send({ email: mockUser.email, password: mockUser.password })
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        mockUserAuthenticated.token = res.body.token;
                        mockUserAuthenticated.idUser = res.body.user.id_users;

                        chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });

        describe("/GET", () => {
            it("should check if format user response has the necessary attributes", () => {
                return chai
                    .request(serverTests)
                    .get(`/users/${mockUserAuthenticated.idUser}`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        sessionUserSchema = {
                            status: res.body.status,
                            user: {
                                id_users: res.body.user.id_users,
                            },
                        };

                        const schemaToCompare = {
                            status: res.body.status,
                            user: {
                                id_users: res.body.user.id_users,
                            },
                        };

                        chai.expect(res).have.status(200);
                        assert.containSubset(sessionUserSchema, schemaToCompare);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });

        describe("/PUT", () => {
            it("should update the data registered user in database", () => {
                return chai
                    .request(serverTests)
                    .put(`/users/${mockUserAuthenticated.idUser}`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .send(mockUserToUpdate)
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }
                        chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });

            it("should deny to duplicate emails in database", () => {
                return chai
                    .request(serverTests)
                    .put(`/users/${mockUserAuthenticated.idUser}`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .send({ name: mockUserToUpdate.name, email: mockAnotherkUser.email })
                    .then((res) => {
                        if (res.statusCode !== 403) {
                            throw new Error(chai.expect(res).have.status(403));
                        }
                        chai.expect(res).have.status(403);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });

        describe("/PATCH", () => {
            const newPassword = faker.internet.password();

            it("should allow user to change his password", () => {
                return chai
                    .request(serverTests)
                    .patch(`/users/${mockUserAuthenticated.idUser}/password-change`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .send({ password: newPassword, password_confirm: newPassword })
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }
                        chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });

            it("should deny to change password of another user", () => {
                return chai
                    .request(serverTests)
                    .patch(`/users/1/password-change`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .send({ password: newPassword, password_confirm: newPassword })
                    .then((res) => {
                        if (res.statusCode !== 403) {
                            throw new Error(chai.expect(res).have.status(403));
                        }
                        chai.expect(res).have.status(403);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });
    });
});
