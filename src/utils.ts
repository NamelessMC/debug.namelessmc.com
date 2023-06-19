const formatDate = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    const day = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const time = date.toLocaleTimeString('en-US', {
        timeStyle: 'short',
    });

    return `${day} ${time}`;
};

const isOfficialModule = (moduleName: string): boolean => {
    return ['Core', 'Forum', 'Discord Integration', 'Cookie Consent', 'Members'].includes(moduleName);
};

const isOfficialTemplate = (templateName: string): boolean => {
    return ['DefaultRevamp', 'Default'].includes(templateName);
};

const capitalize = (string: string): string => {
    return string[0].toUpperCase() + string.substring(1);
};

const goToModule = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
    });
};

const humanFileSize = (bytes: number): string => {
    if (bytes === 0) {
        return '0 B';
    }
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export {
    formatDate,
    isOfficialModule,
    isOfficialTemplate,
    capitalize,
    goToModule,
    humanFileSize,
};
