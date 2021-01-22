import * as yup from "yup";

const updatePasswordSchema = yup.object().shape({
    password: yup.string().required(),
    password_confirm: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "password doesn't match"),
});

export { updatePasswordSchema };
