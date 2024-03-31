export function validateEmailFormat(schema: unknown, data: unknown) {
  if (typeof data !== "string") return false;

  // Regular expression to match an email pattern
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return emailPattern.test(data);
}
