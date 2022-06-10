import { ICreateViewDTO } from "../../dtos/views/ICreateViewDTO";
import { ViewDataDTO } from "../../dtos/views/ViewDataDTO";

interface IViewsRepository {
  create(data: ICreateViewDTO): Promise<void>;
  findAll(postId: string): Promise<ViewDataDTO[]>;
}

export { IViewsRepository };
