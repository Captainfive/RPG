// Require Node.js Dependencies
const { readFile } = require("fs").promises;
const { join } = require("path");

// Require Third-party Dependencies
const inquirer = require("inquirer");
const sqlite = require("sqlite");

// CONSTANTS
const FILE_INDENTATION = 4;
const ROOT_DIR = join(__dirname, "..");
const START_QUESTION = require(join(ROOT_DIR, "src", "questions", "starter.json"));
const CREATE_WORLD = require(join(ROOT_DIR, "src", "questions", "createworld.json"));
const QUIT_GAME = require(join(ROOT_DIR, "src", "questions", "quit.json"));
const MENU = require(join(ROOT_DIR, "src", "questions", "menu.json"));
const OPTION_SAVE = require(join(ROOT_DIR, "src", "questions", "option_save.json"));
const RETURN_MENU = require(join(ROOT_DIR, "src", "questions", "return_menu.json"));

async function main() {
    await console.clear();
    const response = await inquirer.prompt(START_QUESTION);
    console.clear();
    if (response.starter === "Nouvelle partie") {
        const db = await sqlite.open(join(ROOT_DIR, "databases", "config.sqlite"));
        const sql = await readFile(join(ROOT_DIR, "scripts", "config.sql"), { encoding: "utf8" });

        await db.exec(sql);

        const response = await inquirer.prompt(CREATE_WORLD);
        console.clear();

        await db.exec(`INSERT INTO "world_name"
        ("name")
        VALUES
        ("${response.nom_partie}");`);

        const answer = await inquirer.prompt(MENU);
        console.clear();

        if (answer.menu === "personnage") {

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
                    return
                }
                else {
                    const response = await inquirer.prompt(OPTION_SAVE);
                    console.clear();

                    if (response.options === "Sauvegarder") {
                    };

                    if (response.options === "Quitter") {
                        return
                    };

                    if (response.options === "Retour") {
                    };
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
} main().catch(console.error);
