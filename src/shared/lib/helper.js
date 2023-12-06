function getCurrentDateFormatted() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return day + '.' + month + '.' + year;
}

function getCurrentTimeFormatted() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    return hours + ':' + minutes + ':' + seconds;
}

function getErrorLine(error) {
    const stackLines = error.stack.split('\n');
    if (stackLines.length >= 2) {
        const line = stackLines[1].trim();
        return line;
    }
}

module.exports = {
    getCurrentDateFormatted,
    getCurrentTimeFormatted,
    getErrorLine,
};
