export const AUTH_ENDPOINTS = {
  login: '/login',
  register: '/register',
  logout: '/logout',
} as const;


export const USER_ENDPOINTS = {
  me: '/users/me',
  update: '/users',
} as const;

export const JOB_ENDPOINTS = {
  list: '/jobs',
  done: '/jobs/done',
  posted: '/jobs/posted',
  jobById: '/jobs/:id',
  create: '/jobs',
  update: '/jobs/:id',
  delete: '/jobs/:id',
  apply: '/jobs/:id/apply',
  cancel: '/jobs/:id/cancel',
} as const;
