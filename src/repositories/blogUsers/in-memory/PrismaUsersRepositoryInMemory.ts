import { IUsersRepository } from "../IUsersRepositorie";

class PrismaUsersRepositoryInMemory implements IUsersRepository {
  create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { PrismaUsersRepositoryInMemory };
