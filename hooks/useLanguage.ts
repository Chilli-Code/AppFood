// hooks/useLanguage.ts
import i18n from '@/lib/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const LANGUAGE_KEY = 'app_language';

export const useLanguage = () => {
  const [language, setLanguage] = useState('English');
  const [loaded, setLoaded] = useState(false); // <- ESTO

  useEffect(() => {
    (async () => {
      const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLang) {
        setLanguage(storedLang);
        const langCode = mapLanguageToCode(storedLang);
        await i18n.changeLanguage(langCode);
      }
      setLoaded(true); // <- ESTO
    })();
  }, []);

  const changeLanguage = async (lang: string) => {
    setLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    const langCode = mapLanguageToCode(lang);
    await i18n.changeLanguage(langCode);
  };

  const mapLanguageToCode = (lang: string): string => {
    const map: Record<string, string> = {
      English: 'en',
      Spanish: 'es',
      French: 'fr',
      German: 'de',
      Italian: 'it',
      Portuguese: 'pt',
      Russian: 'ru',
      Japanese: 'jp',
      Korean: 'kr',
      Chinese: 'cn',
      Arabic: 'ar',
      Hindi: 'hi',
      Turkish: 'tr',
      Polish: 'pl',
      Dutch: 'nl',
      Swedish: 'se',
      Greek: 'el',
      Thai: 'th',
      Vietnamese: 'vi',
    };
    return map[lang] || 'en';
  };

  return { language, changeLanguage, loaded }; // <- RETORNARLO
};
