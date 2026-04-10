import { addDays, parseISO } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

const TZ = "Africa/Lagos";

/** Next calendar midnight in West Africa Time (WAT / Lagos). */
export function getNextMidnightWAT(now: Date = new Date()): Date {
  const lagosDay = formatInTimeZone(now, TZ, "yyyy-MM-dd");
  const nextDayStr = formatInTimeZone(
    addDays(parseISO(lagosDay), 1),
    TZ,
    "yyyy-MM-dd"
  );
  const [y, m, d] = nextDayStr.split("-").map(Number);
  return fromZonedTime(new Date(y, m - 1, d, 0, 0, 0, 0), TZ);
}

export function getSecondsUntilMidnightWAT(now: Date = new Date()): number {
  const end = getNextMidnightWAT(now);
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
}
