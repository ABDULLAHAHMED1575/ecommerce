export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateImage = (file) => {
  const result = { isValid: true, error: '' };
  
  if (!file) {
    result.isValid = false;
    result.error = 'No file selected';
    return result;
  }

  if (!file.type.startsWith('image/')) {
    result.isValid = false;
    result.error = 'Please select a valid image file (JPG, PNG, GIF)';
    return result;
  }
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    result.isValid = false;
    result.error = 'Image size should be less than 5MB';
    return result;
  }

  return result;
};

export const resizeImage = (file, maxWidth = 800, maxHeight = 600) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };

    img.src = URL.createObjectURL(file);
  });
};

export const getDefaultProductImage = () => {
  return '/images/default-product.jpg';
};

export const handleImageError = (e) => {
  e.target.src = getDefaultProductImage();
};

export const createImagePreview = (file) => {
  return URL.createObjectURL(file);
};

export const cleanupImagePreview = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};