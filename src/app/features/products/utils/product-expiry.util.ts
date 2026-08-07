import { PRODUCT_EXPIRY } from '../constants/product-expiry.constants';
import { ProductExpiryStatus } from '../domain/product-expiry-status.type';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const parseDateOnly = (value: string): number | null => {
  const match = DATE_ONLY_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const timestamp = Date.UTC(year, month - 1, day);

  const parsedDate = new Date(timestamp);

  const isValidDate =
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day;

  return isValidDate ? timestamp : null;
};

const getLocalTodayAsUtc = (now: Date): number =>
  Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

export const calculateDaysUntilExpiry = (
  expiryDate: string,
  now: Date = new Date(),
): number | null => {
  const expiryTimestamp = parseDateOnly(expiryDate);

  if (expiryTimestamp === null) {
    return null;
  }

  const todayTimestamp = getLocalTodayAsUtc(now);

  return Math.round((expiryTimestamp - todayTimestamp) / MILLISECONDS_PER_DAY);
};

export const calculateProductExpiryStatus = (
  expiryDate: string,
  now: Date = new Date(),
): ProductExpiryStatus => {
  const daysUntilExpiry = calculateDaysUntilExpiry(expiryDate, now);

  /*
   * Invalid dates are treated as fresh for now,
   * because the API contract requires a valid date.
   * Invalid backend data should not be displayed
   * as expired without evidence.
   */
  if (daysUntilExpiry === null) {
    return 'fresh';
  }

  if (daysUntilExpiry < 0) {
    return 'expired';
  }

  if (daysUntilExpiry <= PRODUCT_EXPIRY.expiringSoonDays) {
    return 'expiring-soon';
  }

  return 'fresh';
};
