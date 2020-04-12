// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'drona.db.elephantsql.com',
      user: 'levcyuph',
      password: 'xmMh8zJyNMcbjq3_PwtUzaeOp5NGZ2Nx',
      database: 'levcyuph', 
    },
    pool: {
      min: 2,
      max: 10,
      // afterCreate: function (conn, done){
      //   conn.query('SET timezone="UTC";', function(err) {
      //     if(err){
      //       done(err, conn);
      //     }
      //   });
      // }
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
