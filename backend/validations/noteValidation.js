import Joi from "joi";

export function validateNote(note) {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    body: Joi.string().min(1).required(),
  });
  return schema.validate(note);
}
