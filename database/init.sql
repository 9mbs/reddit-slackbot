DROP TABLE IF EXISTS slack_reviews;

CREATE TABLE slack_reviews (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  stars INTEGER NOT NULL
);