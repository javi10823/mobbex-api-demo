require("dotenv").config();

module.exports = [
  {
    name: "development",
    type: "postgres",
    host: "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || '',
    database: "mobbex",
    synchronize: true,
    entities: ["src/entity/**/*.ts"],
  },
  {
    name: "production",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    entities: ["build/entity/**/*.js"],
  },
];
