import * as yup from "yup";

const registerUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirm: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "password doesn't match"),
});

const updateUserSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
});

const sessionsUserSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export { registerUserSchema, updateUserSchema, sessionsUserSchema };
