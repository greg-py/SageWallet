import { endOfMonth } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { DATABASE_DATE_FORMAT_STRING } from "../config/constants";

export const formatUTCDate = (date: Date, formatStr: string) => {
  // Convert the local date to the same point in time in UTC
  return formatInTimeZone(date, "UTC", formatStr);
};

export const getUTCDateRange = (year: string, month: string) => {
  const parsedYear = parseInt(year);
  const parsedMonth = parseInt(month);

  // Create the start date in UTC
  const startDate = new Date(Date.UTC(parsedYear, parsedMonth, 1));
  // Calculate the end of the month in UTC
  const endDate = new Date(
    Date.UTC(parsedYear, parsedMonth, endOfMonth(startDate).getDate())
  );

  // Format both dates to string
  const formattedStartDate = formatUTCDate(
    startDate,
    DATABASE_DATE_FORMAT_STRING
  );
  const formattedEndDate = formatUTCDate(endDate, DATABASE_DATE_FORMAT_STRING);

  return { startDate: formattedStartDate, endDate: formattedEndDate };
};
