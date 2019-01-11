#!/usr/bin/env node

// Require Node.js Dependencies
const { readFile, unlink } = require("fs").promises;
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
const { SAVE } = require(join(ROOT_DIR, "scripts", "save.js"));

/**
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function rpg() {
    // CONSTANTS SCOPE AASYNC FUNCTION RPG
    const db = await sqlite.open(join(SHORTCUT_DATABASES, "config.sqlite"));
    const sql = await readFile(join(SHORTCUT_DATABASES, "config.sql"), { encoding: "utf8" });

    // FIRST QUESTION
    const first_start = await inquirer.prompt([START_QUESTION.menu_starter]);
    console.clear();

    // START NEW GAME
    if (first_start.menu_starter === "Nouvelle partie") {
        await db.exec(sql);

        boucle1:
        for (; ;) {
            const user_answer = await inquirer.prompt([START_QUESTION.select_class]);
            console.clear();

            for (; ;) {
                // IF PLAYER CHOOSE WARRIOR
                if (user_answer.select_class === "WARRIOR") {
                    const user_answer = await inquirer.prompt([START_QUESTION.stats_class]);
                    console.clear();

                    // IF PLAYER CHOOSE STATISTIQUES
                    if (user_answer.stats_class === "Statistiques") {
                        const stats = await db.get("SELECT DISTINCT life_points, mana_points, damage_points, block_points  FROM warrior");
                        console.log(stats);

                        const response = await inquirer.prompt([START_QUESTION.return]);
                        console.clear();

                        if (response.return === "Retour") {
                            continue;
                        }
                    };

                    // IF PLAYER CHOOSE SORTS
                    if (user_answer.stats_class === "Sorts") {
                        const sorts = await db.get("SELECT DISTINCT heal, iron_fist, dash FROM warrior");
                        console.log(sorts);

                        const response = await inquirer.prompt([START_QUESTION.return]);
                        console.clear();

                        if (response.return === "Retour") {
                            continue;
                        }
                    };

                    // IF PLAYER SELECT FINALLY THE HERO 
                    if (user_answer.stats_class === "Choisir ce héro") {
                        await db.exec(`INSERT INTO "actual_gaming_class"
                    ("class_name")
                    VALUES
                    ("warrior");
                    `);
                        break boucle1;
                    };


                    // IF PLAYER CHOOSE RETURN
                    if (user_answer.stats_class === "Retour") {
                        continue boucle1;
                    };
                    break;
                };
                break;
            };

                for (; ;) {
                // IF PLAYER CHOOSE ROGUE
                if (user_answer.select_class === "ROGUE") {
                    const user_answer = await inquirer.prompt([START_QUESTION.stats_class]);
                    console.clear();

                    // IF PLAYER CHOOSE STATS
                    if (user_answer.stats_class === "Statistiques") {
                        const stats = await db.get("SELECT DISTINCT life_points, mana_points, damage_points, block_points FROM rogue");
                        console.log(stats);

                        const response = await inquirer.prompt([START_QUESTION.return]);
                        console.clear();

                        if (response.return === "Retour") {
                            continue;
                        }
                    };

                    // IF PLAYER CHOOSE SPELLS
                    if (user_answer.stats_class === "Sorts") {
                        const sorts = await db.get("SELECT DISTINCT dodge, execute, fan_of_knives FROM rogue");
                        console.log(sorts);

                        const response = await inquirer.prompt([START_QUESTION.return]);
                        console.clear();

                        if (response.return === "Retour") {
                            continue;
                        }
                    };

                    // IF PLAYER CHOOSE FINALLY THE HERO
                    if (user_answer.stats_class === "Choisir ce héro") {
                        await db.exec(`INSERT INTO "actual_gaming_class"
                    ("class_name")
                    VALUES
                    ("rogue");
                    `);
                        break boucle1;
                    };


                    // IF PLAYER CHOOSE RETURN
                    if (user_answer.stats_class === "Retour") {
                        continue boucle1;
                    };
                    break;
                };
                break;
            };

                for (; ;) {
                // IF PLAYER CHOOSE WIZARD
                if (user_answer.select_class === "WIZARD") {
                    const user_answer = await inquirer.prompt([START_QUESTION.stats_class]);
                    console.clear();

                    // IF PLAYER CHOOSE STATS
                    if (user_answer.stats_class === "Statistiques") {
                        const stats = await db.get("SELECT DISTINCT life_points, mana_points, damage_points, block_points, spell_damage FROM wizard");
                        console.log(stats);

                        const response = await inquirer.prompt([START_QUESTION.return]);
                        console.clear();

                        if (response.return === "Retour") {
                            continue;
                        }
                    };

                    // IF PLAYER CHOOSE SPELLS
                    if (user_answer.stats_class === "Sorts") {
                        const sorts = await db.get("SELECT DISTINCT barrier, frostlin, floor_is_lava FROM wizard");
                        console.log(sorts);

                        const response = await inquirer.prompt([START_QUESTION.return]);
                        console.clear();

                        if (response.return === "Retour") {
                            continue;
                        }
                    };

                    // IF PLAYER CHOOSE FINALLY THE HERO
                    if (user_answer.stats_class === "Choisir ce héro") {
                        await db.exec(`INSERT INTO "actual_gaming_class"
                    ("class_name")
                    VALUES
                    ("wizard");
                    `);
                        break boucle1;
                    };

                    // IF PLAYER CHOOSE RETURN
                    if (user_answer.stats_class === "Retour") {
                        continue boucle1;
                    };
                    break;
                };
                break;
            };
        };

        // NAME YOUR PARTY
        for (; ;) {
            console.log("Vous devez nommez votre partie");

            const response = await inquirer.prompt([START_QUESTION.nom_partie]);
            console.clear();

            // IF NAME IS NULL
            if (response.nom_partie === "") {
                continue;
            }
            else {
                // WRITE THE NAME OF THE ACTUAL GAME ON THE DATABASE

                await db.exec(`INSERT INTO "world_name"
                ("name")
                VALUES
                ("${response.nom_partie}");`);
                break;
            };
        };
    };


    // LOAD A GAME
    if (first_start.menu_starter === "Charger partie") {
        console.clear();
        return;
    }
    // QUIT THE GAME
    if (first_start.menu_starter === "Quitter") {

        // CLOSING AND DELETING "CONFIG.SQLITE"
        await db.close();
        await unlink(join(SHORTCUT_DATABASES, "config.sqlite"));
        return;
    }

    // Main Menu
    for (; ;) {
        const answer = await inquirer.prompt([MENU.menu]);
        console.clear();

        // IF PLAYER CHOOSE CHARACTER
        if (answer.menu === "personnages") {
            const response = await inquirer.prompt([MENU.personnage]);
            console.clear();

            // IF PLAYER CHOOSE STATS
            if (response.personnage === "Stats") {
                const actual_class = await db.get(`SELECT DISTINCT class_name FROM actual_gaming_class`);
                const stats = await db.get(`SELECT DISTINCT life_points, mana_points, damage_points, block_points, spell_damage FROM ${actual_class.class_name}`);
                console.log(stats);

                const response = await inquirer.prompt([START_QUESTION.return]);
                console.clear();

                if (response.return === "Retour") {
                    continue;
                }
            };

            // IF PLAYER CHOOSE SPELLS
            if (response.personnages === "Sorts") {
                console.log("sorts");
            };

            // IF PLAYER CHOOSE RETURN
            if (response.personnages === "retour") {
                continue;
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
                const config = join(SHORTCUT_DATABASES, "config.sqlite");
                const world_name = await db.get(`SELECT DISTINCT name FROM world_name`);
                const path = join(ROOT_DIR, "databases", "game_saved", `${world_name.name}.sqlite`);

                await SAVE(config, path);
                continue;
            };

            // IF PLAYER CHOOSE QUIT
            if (response.options === "Quitter") {
                const reponse = await inquirer.prompt([MENU.quit]);
                console.clear();

                // CLOSING AND DELETING "CONFIG.SQLITE"
                if (reponse.quit === true) {
                    await db.close();
                    await unlink(join(SHORTCUT_DATABASES, "config.sqlite"));
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
}
rpg().catch(console.error);
