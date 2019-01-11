const { readFile, writeFile } = require("fs").promises;

async function SAVE(data, path) {
    const buf = await readFile(data);
    writeFile(path, buf);
}

module.exports = { SAVE };