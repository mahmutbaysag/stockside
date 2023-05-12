import React, { Fragment, useContext } from "react";
import { IntlProvider } from "react-intl";
import LanguageContext from "../contexts/LanguageContext";
import messages from './messages'

const Provider = ({ children }) => {

    const { language } = useContext(LanguageContext);

    return (
        <IntlProvider
            textComponent={Fragment}
            locale={language}
            messages={messages[language]}
        >
            {children}
        </IntlProvider>
    )
}

export default Provider;