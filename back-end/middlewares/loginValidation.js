import Ajv from "ajv";
import loginSchema from '../schemas/loginSchema.js';


const ajv = new Ajv();
const validate = ajv.compile(loginSchema);

function loginValidation(req, res, next) {
  const valid = validate(req.body);

  if (valid) {
    next();
  } else {
    res.status(400).send(validate.errors);
  }
}

export default loginValidation;