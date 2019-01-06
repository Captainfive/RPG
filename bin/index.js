// Require Node.js Dependencies
const { readFile } = require("fs").promises;
const { join } = require("path");

// Require Third-party Dependencies
const inquirer = require("inquirer");
const sqlite = require("sqlite");

// ROOT-PATH
const ROOT_DIR = join(__dirname, "..");

// QUESTIONS SHORTCUT
const SHORTCUT_QUESTIONS = join(ROOT_DIR, "src", "questions");

// DATABASES SHORTCUT
const SHORTCUT_DATABASES = join(ROOT_DIR, "databases");

// CONSTANTS
const FILE_INDENTATION = 4;
const START_QUESTION = require(join(SHORTCUT_QUESTIONS, "starter.json"));
const CREATE_WORLD = require(join(SHORTCUT_QUESTIONS, "createworld.json"));
const QUIT_GAME = require(join(SHORTCUT_QUESTIONS, "quit.json"));
const MENU = require(join(SHORTCUT_QUESTIONS, "menu.json"));
const OPTION_SAVE = require(join(SHORTCUT_QUESTIONS, "option_save.json"));
const RETURN_MENU = require(join(SHORTCUT_QUESTIONS, "return_menu.json"));
const SELECT_STATS = require(join(SHORTCUT_QUESTIONS, "personnages.json"));
const MENU_RETURN = require(join(SHORTCUT_QUESTIONS, "menu_return.json"));

async function main() {
    await console.clear();

    const response = await inquirer.prompt(START_QUESTION);
    console.clear();

    if (response.starter === "Nouvelle partie") {

        const db = await sqlite.open(join(SHORTCUT_DATABASES, "config.sqlite"));
        const sql = await readFile(join(SHORTCUT_DATABASES, "config.sql"), { encoding: "utf8" });

        await db.exec(sql);

        const response = await inquirer.prompt(CREATE_WORLD);
        console.clear();

        await db.exec(`INSERT INTO "world_name"
        ("name")
        VALUES
        ("${response.nom_partie}");`);

        for (;;) {

            const answer = await inquirer.prompt(MENU);
            console.clear();

            if (answer.menu === "personnages") {
                const response = await inquirer.prompt(SELECT_STATS);
                console.clear();

                if (response.personnages === "Statistiques") {
                    console.log("statistiques");
                    
                    const answer = await inquirer.prompt(MENU_RETURN);
                    console.clear();
                };

                if (response.personnages === "Sorts") {
                    console.log("sorts");
                };

                if (response.personnages === "retour") {
                    continue;
                };
            };

            if (answer.menu === "inventaire") {

            };

            if (answer.menu === "shop") {

            };

            if (answer.menu === "option") {
                const response = await inquirer.prompt(OPTION_SAVE);
                console.clear();

                if (response.options === "Sauvegarder") {
                };

                if (response.options === "Quitter") {
                    const reponse = await inquirer.prompt(QUIT_GAME);
                    console.clear();

                    if (reponse.quit === true) {
                        break;
                    }
                    else {
                        continue;
                    }
                };

                if (response.options === "Retour") {
                };
            };
        }

        if (response.starter === "Charger partie") {
            console.clear();
            console.log("\n");
            console.log("quelle partie voulez vous chargez ?");
        }

        if (response.starter === "Quitter") {
            console.clear();
            console.log("\n");
            console.log("Adieu Camarade");
        }
    }
} main().catch(console.error);
