const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
});

export function database(db: string) {
  return {
    // get returning data
    get(query: string) {
      try {
        knexInstance
          .select('*')
          .from(db)
          .then((result: any) => {
            console.log(result);
            return result;
          });
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      }
    },
    // set new install
    set(id: number, data: JSON) {
      try {
        knexInstance(db)
          .insert({
            id: id,
            install_data: data,
          })
          .then((result: any) => {
            console.log(result);
            return result;
          });
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      }
    },
  };
}
