const env = {
    database: 'db_clases_progra_tdsy',
    username: 'db_clases_progra_user',
    password: '9zeStIkHTKZPnKK3ELEhXmcv5rVcZxf4',
    host: 'dpg-cr6jn5ij1k6c73d5epo0-a',
    port: '5432',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
