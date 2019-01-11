module.exports = async function SAVE(data, name) {
    const { readFile, writeFile } = require("fs").promises;

    await readFile(data, (err, data) => {
        if (err) throw err;
        writeFile(data, name, "utf8");
    });
}
SAVE().catch(console.error);
