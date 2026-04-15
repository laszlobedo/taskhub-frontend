export const AUTH_ENDPOINTS = {
  login: '/login',
  register: '/register',
  logout: '/logout',
} as const;


export const USER_ENDPOINTS = {
  me: '/users/me',
  update: '/users',
} as const;
