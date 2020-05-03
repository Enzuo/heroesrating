WITH data_values (
  SELECT
      $1  AS"idUser"
    , $2  AS "ip"
    , $3  AS "hero1"
    , $4  AS "hT1"
    , $5  AS "s1"
    , $6  AS "hero2"
    , $7  AS "ht2"
    , $8  AS "s2"
    , $9  AS "hero3"
    , $10 AS "ht3"
    , $11 AS "s3"
    , $12 AS "rT"
)
INSERT INTO "voteLog"
  ("idUser", "ip", "hero1", "hT1", "s1", "hero2", "ht2", "s2", "hero3", "ht3", "s3", "rT" ) SELECT 
   "idUser", "ip", "hero1", "hT1", "s1", "hero2", "ht2", "s2", "hero3", "ht3", "s3", "rT"
FROM data_values