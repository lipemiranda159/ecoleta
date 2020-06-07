npm install express
npm install @type/express -d
npm install ts-node -d
npm install typescript -d
npx tsc --init
npm install ts-node-dev -D
npx ts-node-dev ./src/server.ts
add script dev in package.json
npx create-react-app web --template=typescript
npm install knex

- Create connection folder
- Create connection.ts
  npm install sqlite3
- Create migration folder
- Create migration files using the structure below
  import Knex from "knex";

export async function up(knex: Knex) {
return knex.schema.createTable("points", (table) => {
table.increments("id").primary();
table.string("image").notNullable;
table.string("name").notNullable;
table.string("email").notNullable;
table.string("whatsapp").notNullable;
table.decimal("latitude").notNullable;
table.decimal("longitude").notNullable;
table.string("city").notNullable;
//Second parameter is the length of the string
table.string("uf", 2).notNullable;
});
}
export async function down(knex: Knex) {
return knex.schema.dropTable("points");
}

- create knexfile
- exec command: npx knex migrate:latest --knexfile knexfile.ts
