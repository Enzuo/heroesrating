WITH data_values AS (
  SELECT
      $1::BIGINT  AS "idUser"
    , $2::TEXT  AS "ip"
    , $3::INTEGER  AS "hero1"
    , $4::INTEGER  AS "hT1"
    , $5::BOOLEAN  AS "s1"
    , $6::INTEGER  AS "hero2"
    , $7::INTEGER  AS "ht2"
    , $8::BOOLEAN  AS "s2"
    , $9::INTEGER  AS "hero3"
    , $10::INTEGER AS "ht3"
    , $11::BOOLEAN AS "s3"
    , $12::INTEGER AS "rT"
)
INSERT INTO "voteLog"
  ("idUser", "ip", "hero1", "hT1", "s1", "hero2", "ht2", "s2", "hero3", "ht3", "s3", "rT" ) SELECT 
   "idUser", "ip", "hero1", "hT1", "s1", "hero2", "ht2", "s2", "hero3", "ht3", "s3", "rT"
FROM data_values