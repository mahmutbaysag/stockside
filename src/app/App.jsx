import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
import { AuthProvider } from "./contexts/JWTAuthContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import routes from "./routes";
import { I18nProvider, LOCALES } from "./i18n";
import { LanguageProvider } from "./contexts/LanguageContext";
const App = () => {
  const content = useRoutes(routes);

  return (
    <LanguageProvider>
      <I18nProvider>
        <SettingsProvider>
          <MatxTheme>
            <AuthProvider>{content}</AuthProvider>
          </MatxTheme>
        </SettingsProvider>
      </I18nProvider>
    </LanguageProvider>
  );
};

export default App;
