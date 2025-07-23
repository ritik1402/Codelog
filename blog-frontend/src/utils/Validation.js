export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return {
      valid: false,
      message: "Please enter your password",
      color: "red",
    };
  }
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
      color: "red",
    };
  }
  if (password.length > 12) {
    return {
      valid: false,
      message: "Password must be at most 12 characters long",
      color: "red",
    };
  }
  return { valid: true, message: "Valid Password", color: "green" };
};

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateEmail = (email) => {
  if (isValidEmail(email)) {
    return { valid: true, message: "Valid email", color: "green" };
  }
  return {
    valid: false,
    message: "Sorry, this email address is not valid. Please try again.",
    color: "red",
  };
};


