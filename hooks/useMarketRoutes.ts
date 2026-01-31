'use client';

import { useMarket } from '@/contexts/market/MarketContext';
import { ROUTES, withMarketPrefix } from '@/lib/routes';
import { Market } from '@/types/market';

/**
 * Hook to get market-aware routes
 * Automatically prefixes routes with current market
 */
export function useMarketRoutes() {
  const { market } = useMarket();

  const getMarketRoute = (path: string) => {
    return withMarketPrefix(path, market.toLowerCase() as Lowercase<Market>);
  };

  return {
    market,
    getMarketRoute,
    routes: {
      HOME: getMarketRoute(ROUTES.HOME),
      BROWSE: getMarketRoute(ROUTES.BROWSE),
      EXPLORE: getMarketRoute(ROUTES.EXPLORE),
      SELL: getMarketRoute(ROUTES.SELL),
      ABOUT: getMarketRoute(ROUTES.ABOUT),
      CARS: getMarketRoute(ROUTES.CARS),
      CAR: (id?: string) => getMarketRoute(ROUTES.CAR(id)),
      ACCOUNT: getMarketRoute(ROUTES.ACCOUNT),
      ACCOUNT_SETTINGS: getMarketRoute(ROUTES.ACCOUNT_SETTINGS),
      ACCOUNT_CARS: getMarketRoute(ROUTES.ACCOUNT_CARS),
      ACCOUNT_CARS_NEW: getMarketRoute(ROUTES.ACCOUNT_CARS_NEW),
      ACCOUNT_CARS_FOR_SALE: getMarketRoute(ROUTES.ACCOUNT_CARS_FOR_SALE),
      ACCOUNT_BILLING: getMarketRoute(ROUTES.ACCOUNT_BILLING),
      AUTH: {
        LOGIN: getMarketRoute(ROUTES.AUTH.LOGIN),
        SIGNUP: getMarketRoute(ROUTES.AUTH.SIGNUP),
      },
    },
  };
}
