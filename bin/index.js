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
const START_QUESTION = require(join(SHORTCUT_QUESTIONS, "starter.json"));
const MENU = require(join(SHORTCUT_QUESTIONS, "menu.json"));

async function main() {
    const response = await inquirer.prompt([START_QUESTION.starter]);
    console.clear();

    if (response.starter === "Nouvelle partie") {

        const db = await sqlite.open(join(SHORTCUT_DATABASES, "config.sqlite"));
        const sql = await readFile(join(SHORTCUT_DATABASES, "config.sql"), { encoding: "utf8" });

        await db.exec(sql);

        const response = await inquirer.prompt([START_QUESTION.nom_partie]);
        console.clear();

        await db.exec(`INSERT INTO "world_name"
        ("name")
        VALUES
        ("${response.nom_partie}");`);

        for (;;) {

            const answer = await inquirer.prompt([MENU.menu]);
            console.clear();

            if (answer.menu === "personnages") {
                const response = await inquirer.prompt([MENU.personnage]);
                console.clear();

                if (response.personnages === "Stats") {
                    console.log("stats");
                    
                    const answer = await inquirer.prompt([MENU.return_menu]);
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
                const response = await inquirer.prompt([MENU.options]);
                console.clear();

                if (response.options === "Sauvegarder") {
                };

                if (response.options === "Quitter") {
                    const reponse = await inquirer.prompt([MENU.quit]);
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
