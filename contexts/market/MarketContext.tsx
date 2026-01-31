'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Market, MarketConfig, MARKETS, DEFAULT_MARKET } from '@/types/market';
import { detectMarket, isValidMarket } from '@/lib/market-detection';

interface MarketContextType {
  market: Market;
  marketConfig: MarketConfig;
  setMarket: (market: Market) => void;
  isDetecting: boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const MARKET_STORAGE_KEY = 'user-market';
const MARKET_COOKIE_NAME = 'market';

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [market, setMarketState] = useState<Market>(DEFAULT_MARKET);
  const [isDetecting, setIsDetecting] = useState(true);

  // Initialize market on mount
  useEffect(() => {
    let selectedMarket: Market = DEFAULT_MARKET;

    // 1. Check localStorage for saved preference
    try {
      const saved = localStorage.getItem(MARKET_STORAGE_KEY);
      if (saved && isValidMarket(saved)) {
        selectedMarket = saved;
      }
    } catch (error) {
      console.warn('Failed to read market from localStorage:', error);
    }

    // 2. Check cookie (for SSR compatibility)
    if (selectedMarket === DEFAULT_MARKET) {
      try {
        const cookies = document.cookie.split(';');
        const marketCookie = cookies.find(c => c.trim().startsWith(`${MARKET_COOKIE_NAME}=`));
        if (marketCookie) {
          const value = marketCookie.split('=')[1];
          if (isValidMarket(value)) {
            selectedMarket = value;
          }
        }
      } catch (error) {
        console.warn('Failed to read market from cookie:', error);
      }
    }

    // 3. Auto-detect if no preference saved
    if (selectedMarket === DEFAULT_MARKET) {
      selectedMarket = detectMarket();
    }

    setMarketState(selectedMarket);
    setIsDetecting(false);
  }, []);

  // Update market handler
  const setMarket = useCallback((newMarket: Market) => {
    setMarketState(newMarket);

    // Persist to localStorage
    try {
      localStorage.setItem(MARKET_STORAGE_KEY, newMarket);
    } catch (error) {
      console.warn('Failed to save market to localStorage:', error);
    }

    // Persist to cookie (30 days)
    try {
      const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
      document.cookie = `${MARKET_COOKIE_NAME}=${newMarket}; path=/; max-age=${maxAge}; SameSite=Lax`;
    } catch (error) {
      console.warn('Failed to save market to cookie:', error);
    }

    // Update i18n language based on market
    const marketConfig = MARKETS[newMarket];
    if (marketConfig.language && typeof window !== 'undefined') {
      // Trigger language change if you have i18n implemented
      // i18n.changeLanguage(marketConfig.language);
    }
  }, []);

  const marketConfig = MARKETS[market];

  return (
    <MarketContext.Provider value={{ market, marketConfig, setMarket, isDetecting }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
