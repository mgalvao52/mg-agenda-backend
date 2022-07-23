const ValidationError = require("./ValidationError");

module.exports = {
  validateNull: (fields) => {
    let message = [];
    Object.keys(fields).map((field, index) => {
      let value = fields[field];
      if (typeof value === "string" && (!value || value.length <= 0)) {
        message.push({ message: `campo ${field} é obrigatorio` });
      }
    });
    if (message.length > 0) {
      throw new ValidationError(message);
    }
  },
  validateMinMaxLength: (field, fieldName, minLength, maxLength) => {
    let message = [];
    if (typeof field === "string") {
      if (field.length > maxLength) {
        message.push({
          message: `campo ${fieldName} maximo caracteres permitido (${maxLength})`,
        });
      }
      if (field.length < minLength) {
        message.push({
          message: `campo ${fieldName} minimo caracteres permitido (${minLength})`,
        });
      }
    }
    if (message.length > 0) {
      throw new ValidationError(message);
    }
  },
  validatePassword: (field) => {
    let regex = /(?=.*[^0-9a-zA-Z)(?=.*[a-zA-Z])(?=.*[0-9])\S{6,}$/gm;
    if (!regex.test(field)) {
      throw new ValidationError({
        message:
          "campo senha deve ter no minimo 6 caracteres com pelo menos:\n" +
          "1 numero \n1 caractere especial\n" +
          "1 letra maiuscula \n1 letra minuscula",
      });
    }
  },
  validateEmail: (field) => {},
};
