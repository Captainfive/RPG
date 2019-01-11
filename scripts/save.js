// Require Node.js Dependencies
const { readFile, writeFile } = require("fs").promises;

/**
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function SAVE(data, path) {
    // READ DATA AND WRITE IT
    const buf = await readFile(data);
    writeFile(path, buf);
}

module.exports = { SAVE };