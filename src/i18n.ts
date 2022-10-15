import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type translationData = { [key: string]: { translation: string } }

function loadLocaleMessages(): translationData {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);

    const messages: translationData = {};

    locales.keys().forEach((key: string) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = {translation: ""};
            messages[locale]["translation"] = locales(key);
        }
    });

    return messages;
}

const resources = loadLocaleMessages() as any;
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
