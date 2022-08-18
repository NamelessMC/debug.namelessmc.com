import i18n from "i18next";
import { initReactI18next } from "react-i18next";

function loadLocaleMessages(): { [key: string]: string } {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);

    const messages: { [key: string]: string } = {};

    locales.keys().forEach((key: string) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key).default;
        }
    });

    return messages;
}

const resources = loadLocaleMessages().forEach((value: Array<String>, key: String) => {
    return
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

    });

export default i18n;
