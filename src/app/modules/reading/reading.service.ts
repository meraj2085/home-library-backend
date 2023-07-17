import { IReading } from "./reading.interface";
import { Reading } from "./reading.model";

const addReading = async (data: IReading): Promise<IReading | null> => {
  const reading = await Reading.create(data);
  return reading;
};

const getReading = async (email: string) => {
  const reading = await Reading.find({ user_email: email });
  return reading;
};

export const ReadingService = {
  addReading,
  getReading,
};
