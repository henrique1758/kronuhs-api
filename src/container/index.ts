import { container } from "tsyringe";
import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";
import { PrismaCategoriesRepository } from "../repositories/categories/implementations/PrismaCategoriesRepository";
import { PrismaRolesRepository } from "../repositories/roles/implementations/PrismaRolesRepository";
import { IRolesRepository } from "../repositories/roles/IRolesRepository";
import { PrismaUsersRepository } from "../repositories/users/implementations/PrismaUsersRepository";
import { IUsersRepository } from "../repositories/users/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "PrismaUsersRepository",
  PrismaUsersRepository
);

container.registerSingleton<ICategoriesRepository>(
  "PrismaCategoriesRepository",
  PrismaCategoriesRepository
);

container.registerSingleton<IRolesRepository>(
  "PrismaRolesRepository",
  PrismaRolesRepository
);