"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const knex = require('knex');
const knexInstance = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
});
function database(db) {
    return {
        // get returning data
        get(query) {
            try {
                knexInstance
                    .select('*')
                    .from(db)
                    .then((result) => {
                    console.log(result);
                    return result;
                });
            }
            catch (err) {
                console.error(err);
                throw new Error(err);
            }
        },
        // set new install 
        set(id, data) {
            try {
                knexInstance(db).insert({
                    id: id,
                    install_data: data
                }).then((result) => {
                    console.log(result);
                    return result;
                });
            }
            catch (err) {
                console.error(err);
                throw new Error(err);
            }
        }
    };
}
exports.database = database;
;
//# sourceMappingURL=knex.js.map