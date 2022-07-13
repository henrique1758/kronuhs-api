import { NewsletterSubscriberDataDTO } from "../../dtos/newsletter/NewsletterSubscriberDataDTO";

interface INewsletterRepository {
  subscribe(email: string): Promise<void>;
  findAllSubscribers(): Promise<NewsletterSubscriberDataDTO[]>;
  findByEmail(email: string): Promise<NewsletterSubscriberDataDTO | null>;
}

export { INewsletterRepository };