import { format } from "date-fns";

export const createTimestamp = () => {
  return new Date().toISOString();
};

export const formatDateForUI = (isoDate: string) => {
  return format(new Date(isoDate), "MM-dd-yyyy HH:mm:ss");
};
