export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const token = localStorage.getItem('authToken');

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  // Only set application/json if neither body is FormData nor Content-Type is overridden
  if (!(options?.body instanceof FormData) && !('Content-Type' in headers)) {
    headers['Content-Type'] = 'application/json';
  } else if (headers['Content-Type'] === '') {
    delete headers['Content-Type'];
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401) {
        // Auto logout on token expiration/unauthorized
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
      }

      const errorMessage = data?.message || data?.errors?.[0]?.msg || `API Error: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network error occurred');
  }
};