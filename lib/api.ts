// lib/apiClient.ts

import axios from 'axios';

/**
 * Get current market from cookie (for SSR compatibility)
 */
function getMarketFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const marketCookie = cookies.find(c => c.trim().startsWith('market='));
  return marketCookie ? marketCookie.split('=')[1] : null;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Make sure this is set in your .env
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: enable if you're using cookies for auth
});

// Optional: Interceptors (e.g. for auth or logging)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Central error handling (logging, alerts, etc.)
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    // Inject market header
    const market = getMarketFromCookie();
    if (market) {
      config.headers['X-Market'] = market;
    }

    // You can modify headers here (e.g., inject auth token)
    // const token = getAuthToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
