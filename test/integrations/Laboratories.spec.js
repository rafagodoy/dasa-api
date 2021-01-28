import chai, { assert } from "chai";
import { serverTests } from "../../src/config/mocha";
import chaiHttp from "chai-http";
import chaiSubset from "chai-subset";
import faker from "faker";

chai.use(chaiHttp);
chai.use(chaiSubset);

const mockUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

const mockUserAuthenticated = {
    idUser: "",
    token: "",
};

const mockLaboratory = {
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
};

const mockLaboratoryRegistered = {
    idLaboratory: "",
};

const mockLaboratoryToUpdate = {
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
};

describe("Integrations tests", () => {
    describe("Laboratories", () => {
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

            it("should get a session of user authenticated", () => {
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

            it("should register a new laboratory", () => {
                console.log(serverTests);
                console.log(process.env.PORT);
                console.log(serverTests);
                console.log(serverTests);
                console.log(process.env.PORT);
                console.log(serverTests);
                console.log(serverTests);
                return chai
                    .request(serverTests)
                    .post("/laboratories")
                    .send({ ...mockLaboratory })
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        mockLaboratoryRegistered.idLaboratory = res.body.laboratory.id_laboratories;

                        chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });

        describe("/PUT", () => {
            it("should update a laboratory registered", () => {
                return chai
                    .request(serverTests)
                    .put(`/laboratories/${mockLaboratoryRegistered.idLaboratory}`)
                    .send({ ...mockLaboratoryToUpdate })
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
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
        });

        describe("/GET", () => {
            it("should show informations about a laboratory", () => {
                return chai
                    .request(serverTests)
                    .get(`/laboratories/${mockLaboratoryRegistered.idLaboratory}`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
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

            it("should show a list of active laboratories", () => {
                return chai
                    .request(serverTests)
                    .get(`/laboratories`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
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
        });

        describe("/DELETE", () => {
            it("should delete a laboratory", () => {
                return chai
                    .request(serverTests)
                    .delete(`/laboratories/${mockLaboratoryRegistered.idLaboratory}`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
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
        });
    });
});
