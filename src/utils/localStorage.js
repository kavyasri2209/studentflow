// Safe LocalStorage helper functions

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("LocalStorage Save Error:", error);
  }
};

export const loadFromStorage = (key, fallback = []) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error("LocalStorage Load Error:", error);
    return fallback;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("LocalStorage Remove Error:", error);
  }
};
