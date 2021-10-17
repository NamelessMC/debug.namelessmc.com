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
            ? '<span class="font-bold text-green-600">Yes</span>'
            : '<span class="font-bold text-yellow-500">No</span>';
    },
    asCode(value) {
        return `<span class="text-sm text-black font-mono">${value}</span`;
    },
    isEmpty(value, code = false) {
        return value == undefined
            ? "<i>Empty</i>"
            : code
                ? this.asCode(value)
                : value;
    },
    gridColsClass(obj) {
        let count = Object.keys(obj).length;

        if (count > 3) {
            count = 3;
        }

        return `grid-cols-${count}`;
    },
    isOfficialModule(moduleName) {
        return ['Core', 'Forum', 'Discord Integration'].includes(moduleName);
    },
    isOfficialTemplate(templateName) {
        return ['DefaultRevamp', 'Default'].includes(templateName)
    },
    officialBadge() {
        return '<span class="rounded-md text-white bg-blue-500 px-2 py-1 text-xs ml-1">OFFICIAL</span>'
    }
}