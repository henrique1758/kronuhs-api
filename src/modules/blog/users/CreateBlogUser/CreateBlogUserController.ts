import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBlogUserUseCase } from "./CreateBlogUserUseCase";

class CreateBlogUserController {
  async handle(req:Request, res:Response): Promise<Response> {
    const { firstName, lastName, email, password } = req.body;

    const createBlogUserUseCase = container.resolve(CreateBlogUserUseCase);

    await createBlogUserUseCase.execute({
      firstName,
      lastName,
      email,
      password
    });

    return res.status(201).json({ message: "User Created Successfuly!" });
  }
}

export { CreateBlogUserController };

