WITH data_val AS (
  SELECT
      "idHero"::INTEGER
    , "score"::INTEGER
  FROM (VALUES 
     ($1, $2)
    ,($3, $4)
    ,($5, $6)
  ) AS val("idHero", "score")
)
, updated_hero AS (
  UPDATE "hero" 
    SET "score" = "hero"."score" + data_val."score"
  FROM data_val
  WHERE "hero"."idHero" = data_val."idHero"
  RETURNING "hero"."idHero"
)
INSERT INTO "hero" ("idHero", "score") SELECT
    data_val."idHero"
  , data_val."score"
FROM data_val
LEFT JOIN updated_hero ON updated_hero."idHero" = data_val."idHero"
WHERE updated_hero."idHero" IS NULL 