import Ajv from "ajv";
import signupSchema from '../schemas/signupSchema.js';

const ajv = new Ajv();
const validate = ajv.compile(signupSchema);

function signupValidation(req, res, next) {
  const valid = validate(req.body);

  if (valid) {
    next();
  } else {
    res.status(400).send(validate.errors);
  }
}

export default signupValidation;

