// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/sweater_express_dev",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/sweater_express_test",
    migrations: {
      directory: "./db/migrations"
    },
    useNullAsDefault: true
  },
  production: {
    client: "pg",
    connection:
      "postgres://sqlwyyedqfrlmf:55ae411fcc746cdce5c9c08a2e79bd19c2632eacc280591d0c6b9eba14373c3f@ec2-174-129-253-174.compute-1.amazonaws.com:5432/d32561anrjh13j",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  }
};
