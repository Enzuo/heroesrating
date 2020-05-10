--DROP TABLE "voteLog";
--DROP TABLE "hero";


CREATE TABLE "voteLog" (
    "idUser" BIGINT
  , "ip"     VARCHAR(15)
  , "hero1"  SMALLINT
  , "hT1"    INTEGER
  , "s1"     BOOLEAN
  , "hero2"  SMALLINT
  , "ht2"    INTEGER
  , "s2"     BOOLEAN
  , "hero3"  SMALLINT
  , "ht3"    INTEGER
  , "s3"     BOOLEAN
  , "rT"     INTEGER
  , "date"   DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "hero" (
    "idHero" SERIAL PRIMARY KEY
  , "score"  INTEGER
);
