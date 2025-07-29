import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Header component for the app.
 * Provides a language toggle and sets document direction (RTL/LTR) based on selected language.
 * Uses Material UI AppBar and Select for UI.
 */
const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Set default language to English if not selected
  React.useEffect(() => {
    // If language is not set or not supported, default to English
    if (!i18n.language || (i18n.language !== 'en' && i18n.language !== 'ar')) {
      i18n.changeLanguage('en');
      document.dir = 'ltr';
    } else {
      document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [i18n.language, i18n]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t('header.title')}
        </Typography>
        <Select
          value={i18n.language || 'en'}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            i18n.changeLanguage(value);
            document.dir = value === 'ar' ? 'rtl' : 'ltr';
          }}
          sx={{ color: 'white', borderColor: 'white', minWidth: 100 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
