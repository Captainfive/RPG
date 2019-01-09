#!/usr/bin/env node

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
    const db = await sqlite.open(join(SHORTCUT_DATABASES, "config.sqlite"));
    const sql = await readFile(join(SHORTCUT_DATABASES, "config.sql"), { encoding: "utf8" });

    const response = await inquirer.prompt([START_QUESTION.starter]);
    console.clear();

    if (response.starter === "Nouvelle partie") {
        await db.exec(sql);

        for (; ;) {
            const user_answer = await inquirer.prompt([START_QUESTION.select_class]);
            console.clear();

            if (user_answer.select_class === "WARRIOR") {
                const user_answer = await inquirer.prompt([START_QUESTION.stats_class]);
                console.clear();

                if (user_answer.stats_class === "Statistiques") {
                    const stats = await db.get("SELECT DISTINCT life_points, mana_points, damage_points, block_points  FROM warrior");
                    console.log(stats);

                    const response = await inquirer.prompt([START_QUESTION.return]);
                    console.clear();

                    if (response.return === "Retour") {
                        continue;
                    }
                };

                if (user_answer.stats_class === "Sorts") {
                    const sorts = await db.get("SELECT DISTINCT heal, iron_fist, dash FROM warrior");
                    console.log(sorts);

                    const response = await inquirer.prompt([START_QUESTION.return]);
                    console.clear();

                    if (response.return === "Retour") {
                        continue;
                    }
                };

                if (user_answer.stats_class === "Choisir ce héro") {
                    await db.exec(`INSERT INTO "actual_gaming_class"
                    ("class_name")
                    VALUES
                    ("warrior");
                    `);
                    break;
                };


                if (user_answer.stats_class === "Retour") {
                    continue;
                };
                break;
            };
            
            if (user_answer.select_class === "ROGUE") {
                const user_answer = await inquirer.prompt([START_QUESTION.stats_class]);
                console.clear();

                if (user_answer.stats_class === "Statistiques") {
                    const stats = await db.get("SELECT DISTINCT life_points, mana_points, damage_points, block_points FROM rogue");
                    console.log(stats);

                    const response = await inquirer.prompt([START_QUESTION.return]);
                    console.clear();

                    if (response.return === "Retour") {
                        continue;
                    }
                };

                if (user_answer.stats_class === "Sorts") {
                    const sorts = await db.get("SELECT DISTINCT dodge, execute, fan_of_knives FROM rogue");
                    console.log(sorts);

                    const response = await inquirer.prompt([START_QUESTION.return]);
                    console.clear();

                    if (response.return === "Retour") {
                        continue;
                    }
                };

                if (user_answer.stats_class === "Choisir ce héro") {
                    await db.exec(`INSERT INTO "actual_gaming_class"
                    ("class_name")
                    VALUES
                    ("rogue");
                    `);
                    break;
                };


                if (user_answer.stats_class === "Retour") {
                    continue;
                };
                break;
            };
            
            if (user_answer.select_class === "WIZARD") {
                const user_answer = await inquirer.prompt([START_QUESTION.stats_class]);
                console.clear();

                if (user_answer.stats_class === "Statistiques") {
                    const stats = await db.get("SELECT DISTINCT life_points, mana_points, damage_points, block_points, spell_damage FROM wizard");
                    console.log(stats);

                    const response = await inquirer.prompt([START_QUESTION.return]);
                    console.clear();

                    if (response.return === "Retour") {
                        continue;
                    }
                };

                if (user_answer.stats_class === "Sorts") {
                    const sorts = await db.get("SELECT DISTINCT barrier, frostlin, floor_is_lava FROM wizard");
                    console.log(sorts);

                    const response = await inquirer.prompt([START_QUESTION.return]);
                    console.clear();

                    if (response.return === "Retour") {
                        continue;
                    }
                };

                if (user_answer.stats_class === "Choisir ce héro") {
                    await db.exec(`INSERT INTO "actual_gaming_class"
                    ("class_name")
                    VALUES
                    ("wizard");
                    `);
                    break;
                };


                if (user_answer.stats_class === "Retour") {
                    continue;
                };
                break;
            };
        };

        const response = await inquirer.prompt([START_QUESTION.nom_partie]);
        console.clear();

        await db.exec(`INSERT INTO "world_name"
                ("name")
                VALUES
                ("${response.nom_partie}");`);
    };

    if (response.starter === "Charger partie") {
        console.clear();
        console.log("\n");
        console.log("quelle partie voulez vous chargez ?");
    }

    if (response.starter === "Quitter") {
        return;
    }

    for (; ;) {

        const answer = await inquirer.prompt([MENU.menu]);
        console.clear();

        if (answer.menu === "personnages") {
            const response = await inquirer.prompt([MENU.personnage]);
            console.clear();

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
} main().catch(console.error);
