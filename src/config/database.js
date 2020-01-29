var dbConfig = {};
if (process.env.DATABASE_URL){
  dbConfig = {
    dialect : 'postgres',
    protocol: 'postgres',
  }
}else{
  dbConfig = {
    dialect: 'postgres',
    //url: "postgres://pbjxxuuy:9XvjZSXHHBjfOl158najI6KPaopypCTr@tuffi.db.elephantsql.com:5432/pbjxxuuy",
    host: 'rajje.db.elephantsql.com',
    username: 'qzlqoacr',
    password: 'j_3CgHFoMfk8ewaUMUEZZtS0xeVgfD5X',
    database: 'qzlqoacr', 
    define: {
      timestamps: true,
      underscored: false,

    },
  }
}

module.exports = dbConfig;