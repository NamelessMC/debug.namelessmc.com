const formatDate = (seconds: number, minutes: boolean = true) => {
    const date = new Date(seconds * 1000);
    const day = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const time = date.toLocaleTimeString('en-US', {
        timeStyle: 'short'
    });

    return `${day} ${minutes ? time : ''}`;
}

const isOfficialModule = (moduleName: string) => {
    return ['Core', 'Forum', 'Discord Integration', 'Cookie Consent'].includes(moduleName);
}

const isOfficialTemplate = (templateName: string) => {
    return ['DefaultRevamp', 'Default'].includes(templateName);
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
    isOfficialModule,
    isOfficialTemplate,
    capitalize,
    goToModule,
}
