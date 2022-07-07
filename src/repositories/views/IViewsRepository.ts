import { ICreateViewDTO } from "../../dtos/views/ICreateViewDTO";
import { IFindPostRequest } from "../../dtos/views/IFindPostRequest";
import { ViewDataDTO } from "../../dtos/views/ViewDataDTO";

interface IViewsRepository {
  create(data: ICreateViewDTO): Promise<void>;
  findAll(postId: string): Promise<ViewDataDTO[]>;
  findByIpAndPostId(data: IFindPostRequest): Promise<ViewDataDTO | null>;
}

export { IViewsRepository };
