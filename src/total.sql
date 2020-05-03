WITH data_val (
  SELECT
    *
  FROM (VALUES 
     ($1, $2)
    ,($3, $4)
    ,($5, $6)
  ) AS ("idHero", "score")
)
, updated_hero AS (
  UPDATE "hero" 
    SET "score" = SUM("hero"."score", data_val."score")
  FROM data_val
  WHERE "hero"."idHero" = data_val."idHero"
  RETURNING "hero"."idHero"
)
INSERT INTO "hero" ("idHero", "score") SELECT
    "idHero"
  , "score"
FROM updated_hero
LEFT JOIN data_val ON updated_hero."idHero" = data_val."idHero"
WHERE updated_hero IS NULL 