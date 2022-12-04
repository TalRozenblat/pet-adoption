import Ajv from "ajv";
import addPetSchema from '../schemas/addPetSchema.js';

const ajv = new Ajv();
const validate = ajv.compile(addPetSchema);

function addPetValidation(req, res, next) {
  const valid = validate(req.body);

  if (valid) {
    next();
  } else {
    res.status(400).send(validate.errors);
  }
}

export default addPetValidation;