import pg from 'pg';
import config from 'config';

const DB = config.get('db.database');
const DB_HOST = config.get('db.host');
const DB_PORT = config.get('db.port');
const DB_USER = config.get('db.user');
const DB_PASSWROD = config.get('db.password');
const DB_MAX = config.get('db.max');

const pool = new pg.Pool({
    database: DB,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWROD,
    max: DB_MAX
});

export const query = async (paramQuery) => {
    const start = Date.now();
    const res = await pool.query(paramQuery);
    const duration = Date.now() - start;
    console.log('executed query', { paramQuery, duration, rows: res.rowCount });
    return res;
};
   
export const getClient = async () => {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000);
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
        client.lastQuery = args
        return query.apply(client, args)
    };
    client.release = () => {
        // clear our timeout
        clearTimeout(timeout)
        // set the methods back to their old un-monkey-patched version
        client.query = query
        client.release = release
        return release.apply(client)
    };
    return client;
};