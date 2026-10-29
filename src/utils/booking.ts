import { customAlphabet } from "nanoid";

export const generateBookingReference = (
  type_code: string | undefined,
): string => {
  const nanoid = customAlphabet("23456789ABCDEFGHJKMNPQRSTUVWXYZ", 2);
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");

  const timestamp = `${dd}${mm}${yy}${hh}${min}`;
  const suffix = nanoid();
  return `${type_code}-${timestamp}-${suffix}`;
};
