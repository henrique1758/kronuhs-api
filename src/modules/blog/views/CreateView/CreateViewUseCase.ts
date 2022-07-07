import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IViewsRepository } from "../../../../repositories/views/IViewsRepository";

interface IRequest {
  ipAdress: string;
  userId?: string;
  postId: string;
}

@injectable()
class CreateViewUseCase {
  constructor(
    @inject("PrismaViewsRepository")
    private viewsRepository: IViewsRepository,
  ) {}

  async execute({ ipAdress, userId, postId }: IRequest): Promise<void> {
    if (!ipAdress) {
      throw new AppError("ip adress is required!");
    }

    if (!postId) {
      throw new AppError("post id is required!");
    }

    const viewAlreadyExists = await this.viewsRepository.findByIpAndPostId({
      ip: ipAdress,
      postId
    });

    if (!viewAlreadyExists) {
      return;
    }

    await this.viewsRepository.create({
      ipAdress,
      postId,
      userId
    });
  }
}
export { CreateViewUseCase };
