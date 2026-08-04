import { createContext, useContext, useMemo, useState } from 'react';

const AppDemoContext = createContext(null);

export function AppDemoProvider({ children }) {
  const [hasNotifications, setHasNotifications] = useState(true);
  const value = useMemo(
    () => ({ hasNotifications, markNotificationsRead: () => setHasNotifications(false) }),
    [hasNotifications]
  );
  return <AppDemoContext.Provider value={value}>{children}</AppDemoContext.Provider>;
}

export function useAppDemo() {
  const context = useContext(AppDemoContext);
  if (!context) throw new Error('useAppDemo doit être utilisé dans AppDemoProvider');
  return context;
}
