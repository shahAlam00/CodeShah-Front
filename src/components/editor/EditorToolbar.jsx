import React, { useState } from 'react';
import {
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Settings,
  Sparkles,
  Play,
  Send,
  Code
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { useSettings } from '../../context/SettingsContext';

export const EditorToolbar = ({
  language,
  onLanguageChange,
  onReset,
  onCopy,
  isFullscreen,
  onToggleFullscreen,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting
}) => {
  const [copied, setCopied] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { editorSettings, updateEditorSetting } = useSettings();

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languages = [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'python', label: 'Python 3' },
    { id: 'java', label: 'Java 21' },
    { id: 'cpp', label: 'C++ 20' }
  ];

  return (
    <>
      <div className="h-11 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-300 select-none">
        {/* Left: Language selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/80 rounded-md border border-slate-700">
            <Code className="w-3.5 h-3.5 text-brand-400" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              aria-label="Code language"
              className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id} className="bg-slate-900 text-slate-200">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center/Right tools */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            title="Copy code"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            title="Reset code"
            aria-label="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            title="Editor settings"
            aria-label="Editor settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Settings Modal */}
      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Editor Preferences"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Editor Theme</label>
            <select
              value={editorSettings.theme}
              onChange={(e) => updateEditorSetting('theme', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs"
            >
              <option value="vs-dark">Dark (Visual Studio Dark)</option>
              <option value="vs-light">Light (Visual Studio Light)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Font Size: {editorSettings.fontSize}px</label>
            <input
              type="range"
              min="12"
              max="20"
              value={editorSettings.fontSize}
              onChange={(e) => updateEditorSetting('fontSize', parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Tab Size</label>
            <div className="flex gap-2">
              {[2, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => updateEditorSetting('tabSize', size)}
                  className={`flex-1 py-1.5 border rounded-lg font-semibold ${
                    editorSettings.tabSize === size ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-slate-300'
                  }`}
                >
                  {size} spaces
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="font-semibold text-slate-700">Word Wrap</span>
            <input
              type="checkbox"
              checked={editorSettings.wordWrap === 'on'}
              onChange={(e) => updateEditorSetting('wordWrap', e.target.checked ? 'on' : 'off')}
              className="w-4 h-4 rounded text-brand-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Minimap</span>
            <input
              type="checkbox"
              checked={editorSettings.minimap}
              onChange={(e) => updateEditorSetting('minimap', e.target.checked)}
              className="w-4 h-4 rounded text-brand-600"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
