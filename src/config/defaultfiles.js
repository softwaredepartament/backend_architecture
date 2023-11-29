const path = require('path');
const fs = require('fs');

function initDefaultFolders() {
    const UPLOAD_FOLDER = fs.existsSync(path.join(process.cwd(), '/upload'));
    if (!UPLOAD_FOLDER) {
        fs.mkdirSync(path.join(process.cwd(), '/upload'));
    }
}

module.exports = {
    initDefaultFolders,
};
