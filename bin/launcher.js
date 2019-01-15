#!/usr/bin/env node

// Require Node.js Dependencies
const { readFile, unlink, readdir } = require("fs").promises;
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
// SAVED_GAMES SHORTCUT
const FOLDER = join(ROOT_DIR, "databases", "game_saved");

// CONSTANTS
const START_QUESTION = require(join(SHORTCUT_QUESTIONS, "starter.json"));
const { MAIN_MENU } = require(join(ROOT_DIR, "scripts", "Main_menu.js"));

/**
 * @async
 * @function LAUNCHER
 * @description Start, load a game or quit the game
 * @returns {Promise<void>}
 */
async function LAUNCHER() {
    // DATABASES FILES
    const GAME_SAVED = await readdir(FOLDER);

    boucle1:
    for (; ;) {
        // INITIALIZATION OF THE BASIC CONFIGURATION
        const db = await sqlite.open(join(SHORTCUT_DATABASES, "config.sqlite"));
        // FIRST QUESTION
        const first_start = await inquirer.prompt([START_QUESTION.menu_starter]);
        console.clear();

        // START NEW GAME
        if (first_start.menu_starter === "Nouvelle partie") {

            // CONSTANTS SCOPE NEW GAME
            const sql = await readFile(join(SHORTCUT_DATABASES, "config.sql"), { encoding: "utf8" });
            await db.exec(sql);

            boucle2:
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

                            // SQL REQUEST TO PRINT ALL SPELLS
                            const sorts = await db.all("SELECT DISTINCT name, effet FROM warrior_spells");
                            const spells = sorts.map(row => `${row.name} : ${row.effet}`);
                            console.log(spells);

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
                            break boucle2;
                        };


                        // IF PLAYER CHOOSE RETURN
                        if (user_answer.stats_class === "Retour") {
                            continue boucle2;
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
                            break boucle2;
                        };


                        // IF PLAYER CHOOSE RETURN
                        if (user_answer.stats_class === "Retour") {
                            continue boucle2;
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
                            break boucle2;
                        };

                        // IF PLAYER CHOOSE RETURN
                        if (user_answer.stats_class === "Retour") {
                            continue boucle2;
                        };
                        break;
                    };
                    break;
                };
            };

            // NAME YOUR PARTY
            for (; ;) {
                console.log("Vous devez nommez votre partie \n");

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
                await db.close();
                    break;
                };
            };
        };


        // LOAD A GAME
        if (first_start.menu_starter === "Charger partie") {
            if (GAME_SAVED.length === 0 ) {
                continue boucle1;
            };

            // SHOW GAMES TO PLAYER
            const loader = await inquirer.prompt({
                message: "Parties Sauvegardées \n",
                type: "list",
                name: "saved_game",
                choices: GAME_SAVED
            });
            console.clear();

            // CLOSE AND DELETE CONFIG.SQLITE
            await db.close();
            await unlink(join(SHORTCUT_DATABASES, "config.sqlite"));

            // LAUNCHING THE GAME MENU
            await MAIN_MENU(join(FOLDER, `${loader.saved_game}`));
            return;
        };
        // QUIT THE GAME
        if (first_start.menu_starter === "Quitter") {

            // CLOSING AND DELETING "CONFIG.SQLITE"
            await db.close();
            await unlink(join(SHORTCUT_DATABASES, "config.sqlite"));
            return;
        }
        break boucle1;
    };
        // LAUNCHING THE GAME MENU
    MAIN_MENU(join(SHORTCUT_DATABASES, "config.sqlite"));
}
LAUNCHER().catch(console.error);
