import dayjs from "dayjs";
import { injectable } from "tsyringe";
import { IDateProvider } from "../IDateProvider";

@injectable()
class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): Boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };

