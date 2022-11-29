import { sqliteConection } from "../database/sqlite/index.js";
import { AppError } from "../utils/app.error.js";
import { hash, compare } from "bcrypt";
class UserController {
  async create(req, res) {
    const { name, email, password, isadmin } = req.body;
    if (!name || !email || !password || !isadmin) {
      throw new AppError("Todos os dados são obrigatório");
    }
    const database = await sqliteConection();
    const chekEmailExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    if (chekEmailExists) {
      throw new AppError("Este endereço de email já existe");
    }
    const hashedPassword = await hash(password, 8);
    await database.run(
      "INSERT INTO users (name,email, password) VALUES (?,?,?)",
      [name, email, hashedPassword]
    );
    const UserData = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    const { id, created_at, updated_at } = UserData;
    return res.status(201).json({
      status: "success",
      id,
      created_at,
      updated_at,
    });
  }
  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;
    const database = await sqliteConection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    const emailUser = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    if (!user) {
      throw new AppError("usuário não encontrado");
    }
    if (emailUser && emailUser.id !== user.id) {
      throw new AppError("Email já em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "você precisa informar a senha antiga para definir a nova senha"
      );
    }
    if (old_password && password) {
      const ComparePassword = await compare(old_password, user.password);
      if (!ComparePassword) {
        throw new AppError("a senha antiga não condiz.");
      }
      user.password = await hash(password, 8);
    }
    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return res.status(200).json({
      message: "sucess",
    });
  }
}
export { UserController };