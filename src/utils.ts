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
    gridColsClass,
    isOfficialModule,
    isOfficialTemplate,
    capitalize,
    goToModule,
}
