const service = require("./service");
const validation = require("../validations/validate");
const ValidationError = require("../validations/ValidationError");
const { verify, encrypt } = require("../helpers");
module.exports = class usuarioService {
  static async insert(usuario) {
    try {
      this.validate(usuario);
      const usuarioDb = await service.query(
        "select * from usuario where email = ?",
        usuario.email
      );
      if (usuarioDb.length > 0) {
        throw new ValidationError({ message: "email já existe" });
      }
      const hash = await encrypt(usuario.senha);
      usuario.setSenha(hash);
      const result = await service.query("insert into usuario set ?", usuario);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async update(usuario) {
    try {
      this.validate(usuario);
      const usuarioDb = await service.query(
        "select * from usuario where id = ?",
        usuario.id
      );
      if (usuarioDb.length <= 0) {
        throw new ValidationError({ message: "usuario não encontrado" });
      }
      const result = await service.query(
        "update usuario set nome=? where id = ?",
        [usuario.nome, usuario.id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async login({ email, senha }) {
    try {
      validation.validateNull({ email: email, senha: senha });
      const result = await service.query(
        "select * from usuario where email = ?",
        [email]
      );
      if (result.length <= 0) {
        throw new ValidationError({ message: "login ou senha invalido" });
      }
      const valid = await this.validateLogin(senha, result[0].senha);
      if (!valid) {
        throw new ValidationError({ message: "login ou senha invalido" });
      }
      return result[0];
    } catch (error) {
      throw error;
    }
  }
  static validate(usuario) {
    validation.validateNull(usuario);
    validation.validateMinMaxLength(usuario.nome, "nome", 3, 20);
    validation.validatePassword(usuario.senha);
  }
  static async validateLogin(senha, hash) {
    return await verify(senha, hash);
  }
};
