const env = {
    database: 'db_clases_progra_tdsy_ku4y',
    username: 'db_clases_progra_user',
    password: 'K5kiENWHhNnlCiCLbRZsNcXADIWKhMA8',
    host: 'dpg-crqdqag8fa8c7390h2k0-a.oregon-postgres.render.com',
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