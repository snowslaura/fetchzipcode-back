import Joi from "joi";

export const CEPSchema = Joi.object({
  CEP: Joi.string().length(8).required()
});