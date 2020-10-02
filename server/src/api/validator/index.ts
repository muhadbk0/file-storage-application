import { celebrate, Joi } from 'celebrate'
 
const register = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().min(6).max(20).required(),
  })
})
const login = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().min(6).max(20).required(),
  })
})

const userUpdate = celebrate({
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    username:Joi.string(),
    about:Joi.string().allow(null, ''),
    age: Joi.number().min(9).max(99),
    sex: Joi.string(),
    social:Joi.array().items(Joi.object({
      name: Joi.string(),
      url: Joi.string()
    }))
  })
})
export default {
  userUpdate,
  register,
  login
};
