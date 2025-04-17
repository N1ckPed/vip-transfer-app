import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'gr' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="text"
      color="inherit"
      sx={{ fontSize: '1.5rem', minWidth: 'auto' }}
    >
      {i18n.language === 'en' ? '🇬🇷' : '🇬🇧'}
    </Button>
  );
};

export default LanguageSwitcher;
