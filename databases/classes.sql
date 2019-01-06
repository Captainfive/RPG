-- WARRIOR !

    -- adding warrior table
CREATE TABLE IF NOT EXISTS "warrior" (
    "sorts" VARCHAR(40),
    "argent" INTEGER,
    "tête" VARCHAR(40),
    "torse" VARCHAR(40),
    "mains" VARCHAR(40),
    "jambes" VARCHAR(40),
    "pieds" VARCHAR(40)
);

    -- pushing in warrior table
INSERT INTO warrior (sorts, argent, tête, torse, mains, jambes, pieds)
 VALUES
 ('warrior_spells', '500');


    -- adding warrior_spells
CREATE TABLE IF NOT EXISTS "warrior_spells" (
    "heal" INTEGER,
    "iron_fist" INTEGER,
    "dash" INTEGER
);

    -- pushing in warrior_spells table
INSERT INTO warrior_spells (heal, iron_fist, dash)
 VALUES
 ('50', '300', '250');


-- WIZARD !

    -- adding wizard table
CREATE TABLE IF NOT EXISTS "wizard" (
    "sorts" VARCHAR(40),
    "argent" INTEGER,
    "tête" VARCHAR(40),
    "torse" VARCHAR(40),
    "mains" VARCHAR(40),
    "jambes" VARCHAR(40),
    "pieds" VARCHAR(40)
);

-- pushing in wizard table
INSERT INTO wizard (sorts, argent, tête, torse, mains, jambes, pieds)
 VALUES
 ('wizard_spells', '500');


-- adding wizard_spells
CREATE TABLE IF NOT EXISTS "wizard_spells" (
    "barrier" INTEGER,
    "frostlin" INTEGER,
    "floor_is_lava" INTEGER
);

-- pushing in wizard_spells table
INSERT INTO wizard_spells (barrier, frostlin, floor_is_lava)
 VALUES
 ('200', '650', '450');

 -- ROGUE !

    -- adding rogue table
CREATE TABLE IF NOT EXISTS "rogue" (
    "sorts" VARCHAR(40),
    "argent" INTEGER,
    "tête" VARCHAR(40),
    "torse" VARCHAR(40),
    "mains" VARCHAR(40),
    "jambes" VARCHAR(40),
    "pieds" VARCHAR(40)
);

-- pushing in rogue table
INSERT INTO rogue (sorts, argent, tête, torse, mains, jambes, pieds)
 VALUES
 ('rogue_spells', '500');


-- adding rogue_spells
CREATE TABLE IF NOT EXISTS "rogue_spells" (
    "dodge" INTEGER,
    "execute" INTEGER,
    "fan_of_knives" INTEGER
);

-- pushing in rogue_spells table
INSERT INTO rogue_spells (dodge, execute, fan_of_knives)
 VALUES
 ('200', '650', '450');