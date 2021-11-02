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
    booleanBadge(value) {
        return value
            ? `<span class="font-bold text-base text-green-600">${this.$t('misc.yes')}</span>`
            : `<span class="font-bold text-base text-yellow-500">${this.$t('misc.no')}</span>`;
    },
    asCode(value) {
        return `<span class="text-sm text-black dark:text-gray-300 font-normal font-mono">${value}</span`;
    },
    isEmpty(value, code = false) {
        return !value
            ? `<i class="font-normal text-base dark:text-gray-300">${this.$t('misc.empty')}</i>`
            : code
                ? this.asCode(value)
                : `<span class="font-normal text-base dark:text-gray-300">${value}</span>`;
    },
    gridColsClass(obj) {
        let count = Object.keys(obj).length;

        if (count == 1) {
            return 'md:grid-cols-1';
        }

        if (count == 2) {
            return 'md:grid-cols-2';
        }

        return 'md:grid-cols-3';
    },
    isOfficialModule(moduleName) {
        return ['Core', 'Forum', 'Discord Integration'].includes(moduleName);
    },
    isOfficialTemplate(templateName) {
        return ['DefaultRevamp', 'Default'].includes(templateName)
    },
    officialBadge() {
        return `<span class="rounded-md text-white bg-blue-500 px-2 py-1 text-xs ml-1">${this.$t('misc.official')}</span>`
    },
    capitalize(string) {
        return string[0].toUpperCase() + string.substring(1);
    },
    humanFileSize(size) {
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },
}