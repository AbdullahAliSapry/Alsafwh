import * as yup from "yup";

const RegisterSchema = yup.object().shape({
    answerName: yup
    .string()
    .required()
});

export default RegisterSchema;
