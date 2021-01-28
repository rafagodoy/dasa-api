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

const mockExamLaboratoryRegistered = {
    idExamLaboratory: "",
};

describe("Integrations tests", () => {
    describe("Exams laboratories", () => {
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

                        return chai.expect(res).have.status(200);
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

                        return chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });

            it("should associate a exam in the laboratory", () => {
                return chai
                    .request(serverTests)
                    .post("/laboratories/1/exams/2/associate")
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        mockExamLaboratoryRegistered.idExamLaboratory =
                            res.body.exams_laboratories.id_exams_laboratories;

                        return chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });

        describe("/DELETE", () => {
            it("should delete a exam-laboratory association", () => {
                return chai
                    .request(serverTests)
                    .delete(`/exams-laboratories/${mockExamLaboratoryRegistered.idExamLaboratory}`)
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        return chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });
    });
});
