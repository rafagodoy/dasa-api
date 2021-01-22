import chai, { assert } from "chai";
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

const mockExam = {
    name: faker.random.word(),
    type: "clinical_analysis",
};

const mockExamRegistered = {
    idExam: "",
};

const mockExamToUpdate = {
    name: faker.random.word(),
    type: "image",
};

describe("Integrations tests", () => {
    describe("Exams", () => {
        describe("/POST", () => {
            it("should register a new user in database", () => {
                return chai
                    .request(process.env.NODE_SERVER)
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
                    .request(process.env.NODE_SERVER)
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

            it("should register a new exam", () => {
                return chai
                    .request(process.env.NODE_SERVER)
                    .post("/exams")
                    .send({ ...mockExam })
                    .set("Authorization", `Bearer ${mockUserAuthenticated.token}`)
                    .then((res) => {
                        if (res.statusCode !== 200) {
                            throw new Error(chai.expect(res).have.status(200));
                        }

                        mockExamRegistered.idExam = res.body.exam.id_exam;

                        return chai.expect(res).have.status(200);
                    })
                    .catch((err) => {
                        throw err;
                    });
            });
        });

        describe("/PUT", () => {
            it("should update a exam registered", () => {
                return chai
                    .request(process.env.NODE_SERVER)
                    .put(`/exams/${mockExamRegistered.idExam}`)
                    .send({ ...mockExamToUpdate })
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

        describe("/GET", () => {
            it("should show a list of active exams", () => {
                return chai
                    .request(process.env.NODE_SERVER)
                    .get(`/exams`)
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
