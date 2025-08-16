'use client';

import { createContext, useState } from 'react';

interface GlobalContext {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const GlobalContext = createContext<GlobalContext>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

interface Props {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
