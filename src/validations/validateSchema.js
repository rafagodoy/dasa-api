async function validadeSchema(data, schema) {
    try {
        return await schema.validate(data);
    } catch (error) {
        return { hasErrorValidation: true, error: error.errors };
    }
}

export default validadeSchema;
