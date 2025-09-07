import React, { createContext, useContext, useState } from 'react';

interface SettingsState {
  darkMode: boolean;
  alertVolume: number;
  showTooltips: boolean;
}

const defaultSettings: SettingsState = {
  darkMode: false,
  alertVolume: 60,
  showTooltips: true,
};

const SettingsContext = createContext<{
  settings: SettingsState;
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
} | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('Missing SettingsProvider');
  return ctx;
};
