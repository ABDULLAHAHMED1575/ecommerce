export const formatPrice = (price, currency = 'Rs.') => {
  if (typeof price !== 'number') return currency + ' 0';
  return currency + ' ' + Math.round(price).toLocaleString('en-PK');
};
export const formatDate = (date) => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};
export const calculateCartTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  
  return items.reduce((total, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 0;
    return total + (price * quantity);
  }, 0);
};
export const calculateCartItemsCount = (items) => {
  if (!Array.isArray(items)) return 0;
  
  return items.reduce((total, item) => {
    return total + (item.quantity || 0);
  }, 0);
};
export const validateEmail = (email) => {
  const result = { isValid: true, error: '' };
  
  if (!email || typeof email !== 'string') {
    result.isValid = false;
    result.error = 'Email is required';
    return result;
  }
  email = email.trim();
  
  if (email.length === 0) {
    result.isValid = false;
    result.error = 'Email cannot be empty';
    return result;
  }
  if (email.length < 5) {
    result.isValid = false;
    result.error = 'Email is too short';
    return result;
  }
  if (email.length > 254) {
    result.isValid = false;
    result.error = 'Email is too long';
    return result;
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    result.isValid = false;
    result.error = 'Please enter a valid email address';
    return result;
  }
  if (email.includes('..')) {
    result.isValid = false;
    result.error = 'Email cannot contain consecutive dots';
    return result;
  }
  if (email.startsWith('.') || email.endsWith('.')) {
    result.isValid = false;
    result.error = 'Email cannot start or end with a dot';
    return result;
  }
  const pakistaniDomains = ['pk', 'com.pk', 'org.pk', 'edu.pk', 'gov.pk'];
  const domain = email.split('@')[1]?.toLowerCase();
  
  return result;
};

export const isValidEmail = (email) => {
  const validation = validateEmail(email);
  return validation.isValid;
};

export const validatePassword = (password) => {
  const result = { 
    isValid: true, 
    error: '', 
    score: 0, 
    strength: 'weak',
    suggestions: []
  };

  if (!password || typeof password !== 'string') {
    result.isValid = false;
    result.error = 'Password is required';
    return result;
  }
  if (password.length < 8) {
    result.isValid = false;
    result.error = 'Password must be at least 8 characters long';
    result.suggestions.push('Use at least 8 characters');
    return result;
  }

  if (password.length > 128) {
    result.isValid = false;
    result.error = 'Password is too long (max 128 characters)';
    return result;
  }
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  const hasUnicode = /[^\x00-\x7F]/.test(password);
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (hasLowerCase) score += 1;
  if (hasUpperCase) score += 1;
  if (hasNumbers) score += 1;
  if (hasSpecialChars) score += 1;
  if (password.length >= 16) score += 1;

  result.score = score;
  if (score >= 6) {
    result.strength = 'strong';
  } else if (score >= 4) {
    result.strength = 'medium';
  } else {
    result.strength = 'weak';
  }
  if (!hasLowerCase) result.suggestions.push('Add lowercase letters (a-z)');
  if (!hasUpperCase) result.suggestions.push('Add uppercase letters (A-Z)');
  if (!hasNumbers) result.suggestions.push('Add numbers (0-9)');
  if (!hasSpecialChars) result.suggestions.push('Add special characters (!@#$%^&*)');
  if (password.length < 12) result.suggestions.push('Use 12+ characters for better security');
  const commonPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /admin/i,
    /welcome/i,
    /pakistan/i,
    /karachi/i,
    /lahore/i,
    /islamabad/i
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      result.suggestions.push('Avoid common words and patterns');
      break;
    }
  }
  if (/(.)\1{2,}/.test(password)) {
    result.suggestions.push('Avoid repeating the same character');
  }
  const meetsMinimumRequirements = hasLowerCase && hasUpperCase && hasNumbers && password.length >= 8;
  
  if (!meetsMinimumRequirements) {
    result.isValid = false;
    result.error = 'Password must contain uppercase, lowercase, and numbers (minimum 8 characters)';
  }

  return result;
};

export const isValidPassword = (password) => {
  const validation = validatePassword(password);
  return validation.isValid;
};

export const getPasswordStrength = (password) => {
  const validation = validatePassword(password);
  
  const strengthInfo = {
    weak: { color: 'red', text: 'Weak', bgColor: 'bg-red-500' },
    medium: { color: 'yellow', text: 'Medium', bgColor: 'bg-yellow-500' },
    strong: { color: 'green', text: 'Strong', bgColor: 'bg-green-500' }
  };

  return {
    ...strengthInfo[validation.strength],
    score: validation.score,
    suggestions: validation.suggestions,
    percentage: Math.min((validation.score / 7) * 100, 100)
  };
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const isProductInStock = (product) => {
  return product && product.stock > 0;
};

export const getStockStatus = (product) => {
  if (!product) return 'Unknown';
  
  const stock = product.stock || 0;
  if (stock === 0) return 'Out of Stock';
  if (stock <= 5) return 'Low Stock';
  return 'In Stock';
};

export const formatOrderStatus = (status) => {
  if (!status) return 'Unknown';
  
  const statusMap = {
    pending: 'Pending',
    paid: 'Paid',
    completed: 'Completed',
    canceled: 'Canceled',
    shipped: 'Shipped'
  };
  
  return statusMap[status.toLowerCase()] || status;
};

export const showSuccessMessage = (message) => {
  import('react-hot-toast').then(({ default: toast }) => {
    toast.success(message);
  });
};

export const showErrorMessage = (message) => {
  import('react-hot-toast').then(({ default: toast }) => {
    toast.error(message);
  });
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('03')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  if (cleaned.length >= 10) {
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
  }
  
  return phone;
};

export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('03')) {
    const validPrefixes = ['030', '031', '032', '033', '034', '035', '036', '037', '038', '039'];
    const prefix = cleaned.slice(0, 3);
    
    if (validPrefixes.includes(prefix)) {
      return { isValid: true, formatted: formatPhoneNumber(phone) };
    } else {
      return { 
        isValid: false, 
        error: 'Please enter a valid Pakistani mobile number (03XX-XXX-XXXX)' 
      };
    }
  }
  if (cleaned.length === 10) {
    return { isValid: true, formatted: formatPhoneNumber(phone) };
  }
  
  if (cleaned.length < 10) {
    return { 
      isValid: false, 
      error: 'Phone number is too short. Please enter at least 10 digits' 
    };
  }
  
  if (cleaned.length > 11) {
    return { 
      isValid: false, 
      error: 'Phone number is too long. Please enter maximum 11 digits' 
    };
  }
  
  return { 
    isValid: false, 
    error: 'Please enter a valid phone number (e.g., 03XX-XXX-XXXX)' 
  };
};

export const isValidPakistaniMobile = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11 && cleaned.startsWith('03');
};

export const cleanPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
};

export const getPhoneNumberType = (phone) => {
  if (!phone) return 'unknown';
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('03')) {
    return 'mobile';
  }
  if (cleaned.length === 10) {
    return 'landline';
  }
  return 'unknown';
};