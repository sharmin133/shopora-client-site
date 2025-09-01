export const isValidEmail = (email) => {
  // simple but robust email regex
  return /^\S+@\S+\.\S+$/.test(email);
};

export const isValidPassword = (password) => {
  // minimum 8 chars, at least one lowercase, one uppercase, one digit
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

export const getPasswordErrors = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters.");
  if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter.");
  if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter.");
  if (!/\d/.test(password)) errors.push("At least one number.");
  return errors;
};
