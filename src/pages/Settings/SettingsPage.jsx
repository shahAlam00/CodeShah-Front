import React, { useState, useEffect, useRef } from 'react';
import { User, Palette, Code2, Save, Moon, Sun, Monitor, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import api from '../../lib/axios';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'editor', label: 'Editor', icon: Code2 },
];

export const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { editorSettings, updateEditorSetting, appearance, setAppearance } = useSettings();
  const { success, error: showError } = useToast();

  const updateEditorSettings = (obj) =>
    Object.entries(obj).forEach(([key, value]) => updateEditorSetting(key, value));
  const updateAppearance = ({ theme }) => setAppearance(theme);

  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
    name: '', email: '', username: '', bio: '',
    location: '', github: '', linkedin: '', website: '',
  });

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState(null); // local blob URL for preview
  const [avatarFile, setAvatarFile] = useState(null); // File object to upload
  const fileInputRef = useRef(null);

  const [saving, setSaving] = useState(false);

  // ── Load current profile from backend ──────────────────────────────────
  useEffect(() => {
    api.get('/user/getuser').then(({ data }) => {
      const u = data.user;
      setForm({
        name: u.fullName || '',
        email: u.email || '',
        username: u.username || '',
        bio: u.bio || '',
        location: u.location || '',
        github: u.githubUrl || '',
        linkedin: u.linkedinUrl || '',
        website: u.website || '',
      });
      // Show avatar already saved in DB
      if (u.avatar) setAvatarPreview(u.avatar);
    }).catch(() => { });
  }, []);

  // ── Handle avatar file selection ────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type & size
    if (!file.type.startsWith('image/')) {
      showError('Please select an image file (JPG, PNG, GIF, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showError('Image size must be under 5 MB.');
      return;
    }

    setAvatarFile(file);
    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── Save profile (with optional avatar upload) ──────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      // Always use FormData so the same endpoint handles both
      // text-only updates and image uploads.
      const formData = new FormData();
      formData.append('fullName', form.name);
      formData.append('username', form.username);
      formData.append('location', form.location);
      formData.append('bio', form.bio);
      formData.append('githubUrl', form.github);
      formData.append('linkedinUrl', form.linkedin);
      formData.append('website', form.website);

      if (avatarFile) {
        // Field name must match upload.single("avatar") in the route
        formData.append('avatar', avatarFile);
      }

      const { data } = await api.put('/user/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update AuthContext so navbar/header refreshes immediately
      updateUser({
        name: data.user.fullName,
        email: data.user.email,
        avatar: data.user.avatar || null,
      });

      // Update avatar preview with the Cloudinary URL returned
      if (data.user.avatar) {
        setAvatarPreview(data.user.avatar);
      }
      setAvatarFile(null); // clear pending file

      success('Profile updated successfully!');
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.message || 'Failed to save profile.';

      // Cloudinary permission error (503 from our backend)
      if (err?.response?.status === 503) {
        showError('Avatar upload blocked: Cloudinary API key needs Upload permission. Fix in Cloudinary Console → Settings → Access Keys.');
        // Retry without image so text fields still save
        try {
          const fd2 = new FormData();
          fd2.append('fullName', form.name);
          fd2.append('username', form.username);
          fd2.append('location', form.location);
          fd2.append('bio', form.bio);
          fd2.append('githubUrl', form.github);
          fd2.append('linkedinUrl', form.linkedin);
          fd2.append('website', form.website);
          const { data: d2 } = await api.put('/user/update-profile', fd2, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          updateUser({ name: d2.user.fullName, email: d2.user.email });
          success('Profile text saved (avatar upload skipped).');
        } catch (_) { }
      } else {
        showError(serverMsg);
      }
    } finally {
      setSaving(false);
    }
  };

  // ── Current avatar to display ───────────────────────────────────────────
  const displayAvatar =
    avatarPreview ||
    user?.avatar ||
    null;

  // ── Initials fallback ───────────────────────────────────────────────────
  const initials = (form.name || user?.name || '?').charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage your profile, preferences, and account settings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Sidebar */}
        <div className="md:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold transition-colors border-l-2 ${activeTab === tab.id
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* ── PROFILE TAB ──────────────────────────────────────────────── */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6 space-y-5">
              <h2 className="text-base font-bold text-slate-900">Profile Information</h2>

              {/* Avatar upload */}
              <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                {/* Avatar circle with camera overlay */}
                <div className="relative group flex-shrink-0">
                  {displayAvatar ? (
                    <img
                      src={displayAvatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center border-2 border-slate-200">
                      <span className="text-white text-2xl font-black select-none">{initials}</span>
                    </div>
                  )}

                  {/* Camera button overlay */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Change avatar"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{form.name || 'Your Name'}</p>
                  <p className="text-xs text-slate-500">@{form.username || 'username'}</p>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    {avatarFile ? `Selected: ${avatarFile.name}` : 'Change Avatar'}
                  </button>

                  {avatarFile && (
                    <p className="text-[11px] text-slate-400">
                      Click Save Changes to upload
                    </p>
                  )}

                  <p className="text-[11px] text-slate-400">JPG, PNG, GIF or WebP · max 5 MB</p>
                </div>
              </div>

              {/* Text fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <Input
                  label="Username"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />
                <Input
                  label="Location"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  placeholder="Tell others about yourself..."
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-all resize-none text-slate-800 placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="GitHub URL"
                  placeholder="https://github.com/you"
                  value={form.github}
                  onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
                />
                <Input
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/you"
                  value={form.linkedin}
                  onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                />
                <Input
                  label="Personal Website"
                  placeholder="https://yoursite.com"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                />
              </div>

              <Button
                variant="primary"
                size="sm"
                leftIcon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          )}

          {/* ── APPEARANCE TAB ───────────────────────────────────────────── */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6 space-y-6">
              <h2 className="text-base font-bold text-slate-900">Appearance</h2>

              <div>
                <p className="text-xs font-bold text-slate-700 mb-3">Color Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'system', label: 'System', icon: Monitor },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => { updateAppearance?.({ theme: id }); success('Theme updated!'); }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${appearance === id
                        ? 'bg-brand-50 border-brand-400 text-brand-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-300'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-bold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-700 mb-3">Interface Language</p>
                <select
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
                  defaultValue="en"
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <Button
                variant="primary" size="sm"
                leftIcon={<Save className="w-4 h-4" />}
                onClick={() => success('Appearance saved!')}
              >
                Save Appearance
              </Button>
            </div>
          )}

          {/* ── EDITOR TAB ───────────────────────────────────────────────── */}
          {activeTab === 'editor' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm p-6 space-y-5">
              <h2 className="text-base font-bold text-slate-900">Code Editor Preferences</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Editor Theme</label>
                  <select
                    value={editorSettings?.theme || 'vs-dark'}
                    onChange={e => updateEditorSettings({ theme: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
                  >
                    <option value="vs-dark">VS Dark (Default)</option>
                    <option value="vs">VS Light</option>
                    <option value="hc-black">High Contrast Black</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Font Size: {editorSettings?.fontSize || 14}px
                  </label>
                  <input
                    type="range" min={11} max={20}
                    value={editorSettings?.fontSize || 14}
                    onChange={e => updateEditorSettings({ fontSize: Number(e.target.value) })}
                    className="w-full accent-brand-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>11px</span><span>20px</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Tab Size</label>
                  <div className="flex gap-2">
                    {[2, 4, 8].map(n => (
                      <button
                        key={n}
                        onClick={() => updateEditorSettings({ tabSize: n })}
                        className={`px-5 py-2 rounded-xl text-sm font-bold border transition-colors ${(editorSettings?.tabSize || 2) === n
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-300'
                          }`}
                      >
                        {n} Spaces
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'minimap', label: 'Show Minimap', desc: 'Display code minimap on the right side' },
                    { key: 'wordWrap', label: 'Word Wrap', desc: 'Wrap long lines to fit the editor width', isString: true },
                    { key: 'lineNumbers', label: 'Line Numbers', desc: 'Show line numbers in the gutter', isString: true },
                  ].map(({ key, label, desc, isString }) => {
                    const val = editorSettings?.[key];
                    const isOn = isString ? val === 'on' || val === true : Boolean(val);
                    return (
                      <div key={key} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{label}</p>
                          <p className="text-xs text-slate-500">{desc}</p>
                        </div>
                        <button
                          onClick={() =>
                            updateEditorSettings({ [key]: isString ? (isOn ? 'off' : 'on') : !isOn })
                          }
                          className={`w-11 h-6 rounded-full transition-colors ${isOn ? 'bg-brand-600' : 'bg-slate-300'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform mx-1 ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button
                variant="primary" size="sm"
                leftIcon={<Save className="w-4 h-4" />}
                onClick={() => success('Editor settings saved!')}
              >
                Save Editor Settings
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
