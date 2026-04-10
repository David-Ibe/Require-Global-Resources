/**
 * Home grid titles — memorable, Nigeria-specific. Product pages still use DB `name`.
 */
export const HOME_PRODUCT_TITLE: Record<string, string> = {
  "magnetic-car-phone-holder": "Magnetic Car Phone Holder",
  "car-seat-gap-organiser": "Car Seat Gap Organiser",
  "lagos-driver-bundle": "The Lagos Driver Bundle"
};

export function homeProductTitle(slug: string, fallbackName: string): string {
  return HOME_PRODUCT_TITLE[slug] ?? fallbackName;
}
