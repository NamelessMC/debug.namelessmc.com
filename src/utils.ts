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

export {
    formatDate
}