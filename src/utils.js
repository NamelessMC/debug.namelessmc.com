export default {
    formatDate(seconds) {
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
    },
    booleanBadge(value, inverted = false) {
        const yesClassName = inverted
            ? 'text-yellow-500'
            : 'text-green-600';

        const noClassName = inverted
            ? 'text-green-600'
            : 'text-yellow-500';

        return value
            ? `<span class="font-bold text-base ${yesClassName}">${this.$t('misc.yes')}</span>`
            : `<span class="font-bold text-base ${noClassName}">${this.$t('misc.no')}</span>`;
    },
    booleanValue(value) {
        return `<span class="font-bold text-base text-normal">${value ? this.$t('misc.yes') : this.$t('misc.no')}</span>`;
    },
    asCode(value) {
        return `<span class="text-sm text-black text-normal font-normal font-mono">${value}</span>`;
    },
    isEmpty(value, code = false) {
        return !value
            ? `<i class="font-normal text-base text-normal">${this.$t('misc.empty')}</i>`
            : code
                ? this.asCode(value)
                : `<span class="font-normal text-base text-normal">${value}</span>`;
    },
    gridColsClass(obj) {
        let count = Object.keys(obj).length;

        if (count === 1) {
            return 'md:grid-cols-1';
        }

        if (count === 2 || count % 2 === 0) {
            return 'md:grid-cols-2';
        }

        return 'md:grid-cols-3';
    },
    isOfficialModule(moduleName) {
        return ['Core', 'Forum', 'Discord Integration', 'Cookie Consent'].includes(moduleName);
    },
    isOfficialTemplate(templateName) {
        return ['DefaultRevamp', 'Default'].includes(templateName);
    },
    officialBadge() {
        return `<span class="rounded-md text-white bg-blue-500 px-2 py-1 text-xs ml-1">${this.$t('misc.official')}</span>`;
    },
    capitalize(string) {
        return string[0].toUpperCase() + string.substring(1);
    },
}
