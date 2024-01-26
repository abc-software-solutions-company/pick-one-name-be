yarn typeorm migration:run -d ./dist/database/data-source.js
yarn typeorm migration:run -d ./dist/database/seed-data-source.js
node dist/main.js
