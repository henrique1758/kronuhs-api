import { Request, Response } from "express";
import { container } from "tsyringe";
import { SubscribeNewsletterUseCase } from "./SubscribeNewsletterUseCase";

class SubscribeNewsletterController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const subscribeNewsletterUseCase = container.resolve(SubscribeNewsletterUseCase);

    await subscribeNewsletterUseCase.execute(email);

    return res.json({ message: "Inscrito com sucesso!" });
  }
}

export { SubscribeNewsletterController }