export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
}

export const RoleInfo = {
  [ROLES.USER]: {
    name: 'Người dùng',
    description: 'User',
  },
  [ROLES.ADMIN]: {
    name: 'Quản trị viên',
    description: 'Admin',
  },
  [ROLES.SUPER_ADMIN]: {
    name: 'Admin',
    description: 'Super Admin',
  },
}