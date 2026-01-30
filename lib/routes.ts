const BRANDS_API_URL = `api/characteristics/brands`;
const VARIANTS_API_URL = `api/characteristics/variants`;

export const ROUTES = {
    HOME: '/',
    BROWSE: '/browse',
    EXPLORE: '/explore',
    SELL: '/list',
    ABOUT: '/about',
    CARS: '/cars',
    CAR: (id?: string) => (id ? `/cars/${id}` : '/cars/[id]'),
    ACCOUNT: '/account',
    ACCOUNT_SETTINGS: '/account/settings',
    ACCOUNT_CARS: '/account/cars',
    ACCOUNT_CARS_NEW: '/account/cars/new',
    ACCOUNT_CARS_FOR_SALE: '/account/cars/for-sale',
    ACCOUNT_BILLING: '/account/billing',
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
    },
    // client-side API helper (optional)
    API: {
        CARS: (page?: number, limit?: number) => {
            const p = page ?? 1;
            const l = limit ?? 10;
            return `/api/cars?page=${p}&limit=${l}`;
        },
        CAR: (id: string) => `/api/cars/${id}`,
        CHARACTERISTICS: {
            BRANDS: BRANDS_API_URL,
            MODELS: (brand: string) => `${BRANDS_API_URL}/${brand}`,
            MODELS_BY_YEAR: (brand: string, year: number) => `${BRANDS_API_URL}/${brand}/${year}`,
            VARIANTS: (model: string) => `${VARIANTS_API_URL}/${model}`,
        },
    },
} as const;

export type Routes = typeof ROUTES;

export function withMarketPrefix(path: string, market?: 'ua' | 'pl' | 'sk'): string {
  if (!market) return path;
  if (path.startsWith(`/${market}`)) return path;
  return `/${market}${path.startsWith('/') ? '' : '/'}${path}`;
}