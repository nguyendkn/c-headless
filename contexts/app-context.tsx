'use client';

import { createContext, useState } from 'react';
import { App } from '../types/app';

interface AppContext {
  app: App | null;
}

const AppContext = createContext<AppContext>({
  app: null,
});

interface Props {
  children: React.ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const [app] = useState(null);

  return <AppContext.Provider value={{ app }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
