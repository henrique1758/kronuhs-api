import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

class CreateRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createRoleUseCase = container.resolve(CreateRoleUseCase);

    await createRoleUseCase.execute(name);

    return res.status(201).json({ message: "Role Created Successfuly!" });
  }
}

export { CreateRoleController };

