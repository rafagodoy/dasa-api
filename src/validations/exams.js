import * as yup from "yup";

const registerAndUpdateExamSchema = yup.object().shape({
    name: yup.string(150).required(),
    type: yup.string(50).required(),
});

export { registerAndUpdateExamSchema };
