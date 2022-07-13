import { container } from "tsyringe";
import { IDateProvider } from "../providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "../providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "../providers/MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "../providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../providers/StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "../providers/StorageProvider/IStorageProvider";
import { IBlogUsersRepository } from "../repositories/blogUsers/IBlogUsersRepository";
import { PrismaBlogUsersRepository } from "../repositories/blogUsers/implementations/PrismaBlogUsersRepository";
import { IBlogUserTokensRepository } from "../repositories/blogUserTokens/IBlogUserTokensRepository";
import { PrismaBlogUserTokensRepository } from "../repositories/blogUserTokens/implementations/PrismaBlogUserTokensRepository";
import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";
import { PrismaCategoriesRepository } from "../repositories/categories/implementations/PrismaCategoriesRepository";
import { ICommentsRepository } from "../repositories/comments/ICommentsRepository";
import { PrismaCommentsRepository } from "../repositories/comments/implementations/PrismaCommentsRepository";
import { IDashboardUsersRepository } from "../repositories/dashboardUsers/IDashboardUsersRepository";
import { PrismaDashboardUsersRepository } from "../repositories/dashboardUsers/implementations/PrismaDashboardUsersRepository";
import { IDashboardUserTokensRepository } from "../repositories/dashboardUserTokens/IDashboardUserTokensRepository";
import { PrismaDashboardUserTokensRepository } from "../repositories/dashboardUserTokens/implementations/PrismaDashboardUserTokensRepository";
import { ILikesRepository } from "../repositories/likes/ILikesRepository";
import { PrismaLikesRepository } from "../repositories/likes/implementations/PrismaLikesRepository";
import { PrismaNewsletterRepository } from "../repositories/newsletter/Implementations/PrismaNewsletterRepository";
import { INewsletterRepository } from "../repositories/newsletter/INewsletterRepository";
import { PrismaPostsRepository } from "../repositories/posts/implementations/PrismaPostsRepository";
import { IPostsRepository } from "../repositories/posts/IPostsRepository";
import { PrismaRolesRepository } from "../repositories/roles/implementations/PrismaRolesRepository";
import { IRolesRepository } from "../repositories/roles/IRolesRepository";
import { PrismaViewsRepository } from "../repositories/views/implementations/PrismaViewsRepository";
import { IViewsRepository } from "../repositories/views/IViewsRepository";

container.registerSingleton<IDashboardUsersRepository>(
  "PrismaDashboardUsersRepository",
  PrismaDashboardUsersRepository
);

container.registerSingleton<IBlogUsersRepository>(
  "PrismaBlogUsersRepository",
  PrismaBlogUsersRepository
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

container.registerSingleton<IDashboardUserTokensRepository>(
  "PrismaDashboardUserTokensRepository",
  PrismaDashboardUserTokensRepository
);

container.registerSingleton<IBlogUserTokensRepository>(
  "PrismaBlogUserTokensRepository",
  PrismaBlogUserTokensRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);

container.registerSingleton<INewsletterRepository>(
  "PrismaNewsletterRepository",
  PrismaNewsletterRepository
);