const { join } = require("path");
const ROOT_DIR = join(__dirname, "..");
const SHORTCUT_QUESTIONS = join(ROOT_DIR, "src", "questions");
const MENU = require(join(SHORTCUT_QUESTIONS, "menu.json"));
const { readFile, unlink, writeFile } = require("fs").promises;
const inquirer = require("inquirer");
const sqlite = require("sqlite");
const SHORTCUT_DATABASES = join(ROOT_DIR, "databases");

async function MAIN_MENU(GAME_DB) {
    const db = await sqlite.open(GAME_DB);
    // Main Menu
    boucle1:
    for (; ;) {
        const actual_class = await db.get(`SELECT DISTINCT class_name FROM actual_gaming_class`);
        const CHARACTER = actual_class.class_name

        const answer = await inquirer.prompt([MENU.menu]);
        console.clear();

        // IF PLAYER CHOOSE CHARACTER
        if (answer.menu === "personnages") {
            const response = await inquirer.prompt([MENU.personnage]);
            console.clear();

            // IF PLAYER CHOOSE STATS
            if (response.personnage === "Stats") {
                const stats = await db.get(`SELECT DISTINCT life_points, mana_points, damage_points, block_points, spell_damage FROM ${CHARACTER}`);
                console.log(stats);

                const response = await inquirer.prompt([START_QUESTION.return]);
                console.clear();

                if (response.return === "Retour") {
                    continue boucle1;
                }
            };

            // IF PLAYER CHOOSE SPELLS
            if (response.personnage === "Sorts") {
                const sorts = await db.all(`SELECT DISTINCT name, effet FROM ${CHARACTER}_spells`);
                const spells = sorts.map(row => `${row.name} : ${row.effet}`);
                console.log(spells);

                const response = await inquirer.prompt([START_QUESTION.return]);
                console.clear();

                if (response.return === "Retour") {
                    continue boucle1;
                }
            };

            // IF PLAYER CHOOSE RETURN
            if (response.personnages === "retour") {
                continue boucle1;
            };
        };

        // IF PLAYER CHOOSE INVENTORY
        if (answer.menu === "inventaire") {

        };

        // IF PLAYER CHOOSE SHOP
        if (answer.menu === "shop") {

        };

        // IF PLAYER CHOOSE OPTION
        if (answer.menu === "option") {
            const response = await inquirer.prompt([MENU.options]);
            console.clear();

            // IF PLAYER CHOOSE SAVE
            if (response.options === "Sauvegarder") {
                const world_name = await db.get(`SELECT DISTINCT name FROM world_name`);
                const path = join(ROOT_DIR, "databases", "game_saved", `${world_name.name}.sqlite`);

                const buf = await readFile(GAME_DB);
                writeFile(path, buf);
                continue boucle1;
            };

            // IF PLAYER CHOOSE QUIT
            if (response.options === "Quitter") {
                const reponse = await inquirer.prompt([MENU.quit]);
                console.clear();

                // CLOSING AND DELETING "CONFIG.SQLITE"
                if (reponse.quit === true) {
                    await db.close();
                    await unlink(GAME_DB);
                    break;
                }
                else {
                    continue boucle1;
                }
            };

            if (response.options === "Retour") {
            };
        };
    }
}
module.exports = { MAIN_MENU };
