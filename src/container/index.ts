import { container } from "tsyringe";
import { PrismaUsersRepository } from "../repositories/users/implementations/PrismaUsersRepository";
import { IUsersRepository } from "../repositories/users/IUsersRepositorie";

container.registerSingleton<IUsersRepository>(
  "PrismaUsersRepository",
  PrismaUsersRepository
);