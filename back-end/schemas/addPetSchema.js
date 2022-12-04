const addPetSchema = {
    type: "object",
    properties: {
        name : { type: "string" },
        type: { type: "string" },
        status: { type: "string" },
        picture: { type: "string" },
        height: { type: "integer" },
        weight: { type: "integer" },
        color: { type: "string" },
        bio: { type: "string" },
        hypo: { type: "integer" },
        diet: { type: "string" },
        breed: { type: "string" },
    },
    required: ["name", "type", "status", "picture", "height", "weight", "color", "bio", "hypo", "diet", "breed"],
    additionalProperties: false,
  };
  
  export default addPetSchema;
  