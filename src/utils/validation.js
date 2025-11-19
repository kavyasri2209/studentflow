// ---------------- STUDENT VALIDATION ----------------

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};

export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

export const hasValue = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== "";
};

export const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

// ---------------- GRADES VALIDATION ----------------

export const isScoreValid = (score, max) => {
  if (score === "" || max === "") return false;
  return Number(score) <= Number(max);
};
