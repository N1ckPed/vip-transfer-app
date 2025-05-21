// src/services/userService.js

const USERS_KEY = "vip_app_users";

export function getUsers() {
  const saved = localStorage.getItem(USERS_KEY);

  if (!saved) {
    const defaultAdmin = [{
      id: 0,
      role: "admin",
      name: "Admin",
      email: "admin@vip.com",
      password: "123"
    }];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultAdmin));
    return defaultAdmin;
  }

  return JSON.parse(saved);
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email === email);
}

export function validateUserLogin(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.role === "Driver") return null; // drivers can't log in
  if (user.password !== password) return null;
  return user;
}
