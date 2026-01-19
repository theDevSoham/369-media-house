import validator from "validator";

export function sanitizeText(input?: string) {
  if (!input) return undefined;
  return validator.escape(validator.trim(input));
}

export function validateEmail(email: string) {
  return validator.isEmail(email);
}

export function validatePhone(phone: string) {
  return validator.isMobilePhone(phone, "any");
}
