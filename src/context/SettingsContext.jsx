import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [editorSettings, setEditorSettings] = useState(() => {
    const saved = localStorage.getItem('codefront_editor_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      theme: 'vs-dark',
      fontSize: 14,
      tabSize: 2,
      wordWrap: 'on',
      minimap: false,
      autoCloseBrackets: true,
      lineNumbers: 'on',
      fontFamily: '"JetBrains Mono", Consolas, "Courier New", monospace'
    };
  });

  const [appearance, setAppearance] = useState(() => {
    return localStorage.getItem('codefront_appearance') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('codefront_editor_settings', JSON.stringify(editorSettings));
  }, [editorSettings]);

  useEffect(() => {
    localStorage.setItem('codefront_appearance', appearance);
    if (appearance === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appearance]);

  const updateEditorSetting = (key, value) => {
    setEditorSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{
      editorSettings,
      appearance,
      setAppearance,
      updateEditorSetting
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
