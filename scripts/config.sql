-- adding World-Name
CREATE TABLE IF NOT EXISTS "world_name" (
    "name" VARCHAR(25)
);

-- adding player
CREATE TABLE IF NOT EXISTS "player" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "class" VARCHAR(25) NOT NULL,
    "argent" INTEGER NOT NULL,
    "tête" VARCHAR(25) NOT NULL,
    "torse" VARCHAR(25) NOT NULL,
    "mains" VARCHAR(25) NOT NULL,
    "jambes" VARCHAR(25) NOT NULL,
    "pieds" VARCHAR(25) NOT NULL
);

-- adding stats
CREATE TABLE IF NOT EXISTS "stats" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "class" VARCHAR(25) NOT NULL,
    "spells" VARCHAR(25) NOT NULL,
    "life" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "spell damage" INTEGER NOT NULL
);

-- adding weapons
CREATE TABLE IF NOT EXISTS "weapons" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "damage" VARCHAR(25) NOT NULL
);

-- adding armors
CREATE TABLE IF NOT EXISTS "armors" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "life" INTEGER,
    "mana" INTEGER,
    "damage" VARCHAR(25)
);

-- adding spells
CREATE TABLE IF NOT EXISTS "spells" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "class" VARCHAR(25) NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "life" INTEGER,
    "damage" VARCHAR(25)
);
