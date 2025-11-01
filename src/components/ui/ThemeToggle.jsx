import React, { useEffect, useState } from 'react';
import Icon from '../AppIcon';

const THEME_KEY = 'theme';

function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

const ThemeToggle = ({ className = '' }) => {
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return; // respect explicit choice
      setTheme(e.matches ? 'dark' : 'light');
    };
    if (media.addEventListener) media.addEventListener('change', handler);
    else media.addListener(handler);
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', handler);
      else media.removeListener(handler);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-card hover:bg-muted transition-colors ${className}`}
    >
      {isDark ? (
        <Icon name="Sun" size={18} className="text-foreground" />
      ) : (
        <Icon name="Moon" size={18} className="text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
