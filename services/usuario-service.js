const service = require("./service");
const validation = require("../validations/validate");
const ValidationError = require("../validations/ValidationError");
const { verify, encrypt } = require("../helpers");
module.exports = class usuarioService {
  static async insert(usuario) {
    try {
      this.validate(usuario);
      const usuarioDb = await service.query(
        "select * from usuario where email = $1",
        [usuario.email]
      );
      if (usuarioDb.length > 0) {
        throw new ValidationError({ message: "email já existe" });
      }
      const hash = await encrypt(usuario.senha);
      usuario.setSenha(hash);
      const result = await service.query(
        `insert into usuario
      (nome,email,senha) values($1,$2,$3)`,
        [usuario.nome, usuario.email, usuario.senha]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async update(usuario) {
    try {
      this.validate(usuario);
      const usuarioDb = await service.query(
        "select * from usuario where id = $1",
        [usuario.id]
      );
      if (usuarioDb.length <= 0) {
        throw new ValidationError({ message: "usuario não encontrado" });
      }
      const result = await service.query(
        `update usuario set nome=$1 where id = $2`,
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
        "select * from usuario where email = $1",
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
