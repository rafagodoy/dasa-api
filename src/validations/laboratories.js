import * as yup from "yup";

const registerAndUpdateLaboratorySchema = yup.object().shape({
    name: yup.string(150).required(),
    address: yup.string(200).required(),
});

export { registerAndUpdateLaboratorySchema };
