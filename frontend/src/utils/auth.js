export const isUserLoggedIn = () => {
  const user = localStorage.getItem('user');
  return user !== null && user !== undefined;
};
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};
export const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user ? user.id : null;
};
export const isAdmin = () => {
  const user = getCurrentUser();
  if (!user || !user.role) return false;
  const roles = user.role.name || user.role.roles || [];
  return Array.isArray(roles) ? roles.includes('admin') : roles === 'admin';
};
export const saveUserData = (userData) => {
  try {
    localStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
export const clearUserData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
};
export const getUserFullName = () => {
  const user = getCurrentUser();
  if (!user) return 'User';
  
  const firstName = user.first_name || '';
  const lastName = user.last_name || '';
  return `${firstName} ${lastName}`.trim() || 'User';
};
export const getUserEmail = () => {
  const user = getCurrentUser();
  return user ? user.email : null;
};
export const hasRole = (roleName) => {
  const user = getCurrentUser();
  if (!user || !user.role) return false;
  
  const roles = user.role.name || user.role.roles || [];
  return Array.isArray(roles) ? roles.includes(roleName) : roles === roleName;
};
export const redirectToLogin = () => {
  window.location.href = '/login';
};
export const requireAuth = () => {
  if (!isUserLoggedIn()) {
    redirectToLogin();
    return false;
  }
  return true;
};