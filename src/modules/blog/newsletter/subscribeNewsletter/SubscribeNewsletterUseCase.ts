import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { INewsletterRepository } from "../../../../repositories/newsletter/INewsletterRepository";

@injectable()
class SubscribeNewsletterUseCase {
  constructor(
    @inject("PrismaNewsletterRepository")
    private newsletterRepository: INewsletterRepository
  ) {}

  async execute(email: string) {
    if (!email) {
      throw new AppError("email is required!");
    }

    const subscriberAlreadyExists = await this.newsletterRepository.findByEmail(email);

    if (subscriberAlreadyExists) {
      throw new AppError("Usuário já inscrito!");
    }

    await this.newsletterRepository.subscribe(email);
  }
}

export { SubscribeNewsletterUseCase }