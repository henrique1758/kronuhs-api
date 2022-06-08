import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDashboardUserUseCase } from "./CreateDashboardUserUseCase";

class CreateDashboardUserController {
  async handle(req:Request, res:Response) {
    const { firstName, lastName, email, password, roleId } = req.body;

    const createDashboardUserUseCase = container.resolve(CreateDashboardUserUseCase);

    await createDashboardUserUseCase.execute({
      firstName,
      lastName,
      email,
      password,
      roleId
    });

    return res.status(201).json({ message: "User Created Successfuly!" });
  }
}

export { CreateDashboardUserController };

