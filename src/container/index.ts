import { container } from "tsyringe";
import { IDateProvider } from "../providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "../providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "../providers/MailProvider/implementations/EtherealMailProvider";
import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";
import { PrismaCategoriesRepository } from "../repositories/categories/implementations/PrismaCategoriesRepository";
import { ICommentsRepository } from "../repositories/comments/ICommentsRepository";
import { PrismaCommentsRepository } from "../repositories/comments/implementations/PrismaCommentsRepository";
import { ILikesRepository } from "../repositories/likes/ILikesRepository";
import { PrismaLikesRepository } from "../repositories/likes/implementations/PrismaLikesRepository";
import { PrismaPostsRepository } from "../repositories/posts/implementations/PrismaPostsRepository";
import { IPostsRepository } from "../repositories/posts/IPostsRepository";
import { PrismaRolesRepository } from "../repositories/roles/implementations/PrismaRolesRepository";
import { IRolesRepository } from "../repositories/roles/IRolesRepository";
import { PrismaUsersRepository } from "../repositories/users/implementations/PrismaUsersRepository";
import { IUsersRepository } from "../repositories/users/IUsersRepository";
import { PrismaUserTokensRepository } from "../repositories/userTokens/implementations/PrismaUserTokensRepository";
import { IUserTokensRepository } from "../repositories/userTokens/IUserTokensRepository";
import { PrismaViewsRepository } from "../repositories/views/implementations/PrismaViewsRepository";
import { IViewsRepository } from "../repositories/views/IViewsRepository";

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

container.registerSingleton<IPostsRepository>(
  "PrismaPostsRepository",
  PrismaPostsRepository
);

container.registerSingleton<ICommentsRepository>(
  "PrismaCommentsRepository",
  PrismaCommentsRepository
);

container.registerSingleton<ILikesRepository>(
  "PrismaLikesRepository",
  PrismaLikesRepository
);

container.registerSingleton<IViewsRepository>(
  "PrismaViewsRepository",
  PrismaViewsRepository
);

container.registerSingleton<IUserTokensRepository>(
  "PrismaUserTokensRepository",
  PrismaUserTokensRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);