import { prisma } from "../../../config/prisma";
import { NewsletterSubscriberDataDTO } from "../../../dtos/newsletter/NewsletterSubscriberDataDTO";
import { INewsletterRepository } from "../INewsletterRepository";

class PrismaNewsletterRepository implements INewsletterRepository {
  async subscribe(email: string): Promise<void> {
    await prisma.newsletterSubscriber.create({
      data: {
        email
      }
    });
  }

  async findAllSubscribers(): Promise<NewsletterSubscriberDataDTO[]> {
    const subscribers = await prisma.newsletterSubscriber.findMany();

    return subscribers
  }

  async findByEmail(email: string): Promise<NewsletterSubscriberDataDTO | null> {
    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: {
        email
      }
    });

    return subscriber
  }
}

export { PrismaNewsletterRepository }