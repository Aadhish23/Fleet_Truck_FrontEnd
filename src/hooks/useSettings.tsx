import { useSettingsContext } from '../context/SettingsContext';

export const useSettings = () => {
  const { settings, updateSetting } = useSettingsContext();

  return {
    settings,
    setDarkMode: (v: boolean) => updateSetting('darkMode', v),
    setVolume: (v: number) => updateSetting('alertVolume', v),
    setTooltips: (v: boolean) => updateSetting('showTooltips', v),
  };
};
