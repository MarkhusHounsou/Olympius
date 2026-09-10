import { createContext, useContext, useMemo, useState } from 'react';

const AppDemoContext = createContext(null);

export function AppDemoProvider({ children }) {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [sportProfile, setSportProfile] = useState(null);
  const [joinedCompetitionIds, setJoinedCompetitionIds] = useState([]);

  const saveSportProfile = (profile) => setSportProfile(profile);
  const joinCompetition = (competitionId) => {
    setJoinedCompetitionIds((current) => (
      current.includes(competitionId) ? current : [...current, competitionId]
    ));
  };

  const value = useMemo(
    () => ({
      hasNotifications,
      markNotificationsRead: () => setHasNotifications(false),
      sportProfile,
      hasSportProfile: Boolean(sportProfile),
      saveSportProfile,
      joinedCompetitionIds,
      joinCompetition,
      hasJoinedCompetition: (competitionId) => joinedCompetitionIds.includes(competitionId),
    }),
    [hasNotifications, sportProfile, joinedCompetitionIds]
  );
  return <AppDemoContext.Provider value={value}>{children}</AppDemoContext.Provider>;
}

export function useAppDemo() {
  const context = useContext(AppDemoContext);
  if (!context) throw new Error('useAppDemo doit être utilisé dans AppDemoProvider');
  return context;
}
