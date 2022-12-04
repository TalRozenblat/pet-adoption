const signupSchema = {
    type: "object",
    properties: {
        fname: { type: "string" },
        lname: { type: "string" },
        password: { type: "string" },
        checkPassword: { type: "string" },
        email: { type: "string" },
        phone: { type: "string"},
    },
    required: ["fname", "lname", "password", "checkPassword", "email"],
    additionalProperties: false,
  };
  
  export default signupSchema;
  