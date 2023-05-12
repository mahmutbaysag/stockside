import { createContext, useState, useEffect } from "react";
import { LOCALES } from '../i18n/locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('lang') || LOCALES.TURKISH);

    const values = { language, setLanguage }

    useEffect(() => {
        const lang = localStorage.setItem('lang', language);
    }, [language])

    return (
        <LanguageContext.Provider value={values}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext;