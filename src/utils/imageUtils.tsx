// utils/imageUtils.ts

export const getValidImageUrl = (url: string): string => {
  
  // Check if it's a relative path starting with '/'
  if (url.startsWith('/')) return url;
  
  // Check if it's a relative path without '/'
  if (!url.startsWith('http') && !url.startsWith('data:')) {
    return `/${url}`;
  }

  // Handle absolute URLs
  try {
    new URL(url);
    return url;
  } catch {
    // If URL construction fails, assume it's a relative path
    return url.startsWith('/') ? url : `/${url}`;
  }
};