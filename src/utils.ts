import { createElement } from "react";
import i18n from "./i18n";

const formatDate = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const day = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const time = date.toLocaleTimeString('en-US', {
        timeStyle: 'short'
    });

    return `${day} ${time}`;
}

// Should these return some sort of react component instead of a string?
const booleanBadge = (value: boolean, inverted: boolean = false) => {
    const yesClassName = inverted
        ? 'text-yellow-600'
        : 'text-green-600';

    const noClassName = inverted
        ? 'text-green-600'
        : 'text-yellow-600';

    return value
        ? `<span class="font-bold text-base ${yesClassName}">${ i18n.t('misc.yes') }</span>`
        : `<span class="font-bold text-base ${noClassName}">${ i18n.t('misc.no') }</span>`;
}

const booleanValue = (value: boolean) => {
    return `<span class="text-base text-normal font-normal">${value ? i18n.t('misc.yes') : i18n.t('misc.no')}</span>`;
}

const asCode = (value: string, escape: boolean = false) => {
    if (escape) {
        value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return `<span class="text-sm text-black text-normal font-normal font-mono">${value}</span>`;
}

const isEmpty = (value: string | Array<any>, code: boolean = false) => {
    return !value || (Array.isArray(value) && value.length === 0)
        ? `<i class="font-normal text-base text-normal">${ i18n.t('misc.empty') }</i>`
        : code
            ? asCode(Array.isArray(value) ? JSON.stringify(value) : value)
            : `<span class="font-normal text-base text-normal">${value}</span>`;
}

const gridColsClass = (obj: object) => {
    let count = Object.keys(obj).length;

    if (count === 1) {
        return 'md:grid-cols-1';
    }

    if (count === 2 || count % 2 === 0) {
        return 'md:grid-cols-2';
    }

    return 'md:grid-cols-3';
}

const isOfficialModule = (moduleName: string) => {
    return ['Core', 'Forum', 'Discord Integration', 'Cookie Consent'].includes(moduleName);
}

const isOfficialTemplate = (templateName: string) => {
    return ['DefaultRevamp', 'Default'].includes(templateName);
}

const officialBadge = () => {
    return `<span class="rounded-md text-white bg-blue-500 px-2 py-1 text-xs ml-1">${ i18n.t('misc.official') }</span>`;
}

const capitalize = (string: string) => {
    return string[0].toUpperCase() + string.substring(1);
}

const goToModule = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
    });
}

export {
    formatDate,
    booleanBadge,
    booleanValue,
    asCode,
    isEmpty,
    gridColsClass,
    isOfficialModule,
    isOfficialTemplate,
    officialBadge,
    capitalize,
    goToModule,
}
