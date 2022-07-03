import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBlogUserUseCase } from "./CreateBlogUserUseCase";

class CreateBlogUserController {
  async handle(req:Request, res:Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createBlogUserUseCase = container.resolve(CreateBlogUserUseCase);

    await createBlogUserUseCase.execute({
      name,
      email,
      password
    });

    return res.status(201).json({ message: "User Created Successfuly!" });
  }
}

export { CreateBlogUserController };