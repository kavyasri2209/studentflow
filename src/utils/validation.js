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

export const isValidDate = (value) => {
  const d = new Date(value);
  return d instanceof Date && !isNaN(d);
};

// ---------------- GRADES VALIDATION ----------------

export const isScoreValid = (score, maxScore) => {
  if (score === "" || maxScore === "") return false;
  return Number(score) <= Number(maxScore);
};
