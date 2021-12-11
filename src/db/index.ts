import * as typeorm from 'typeorm';

type DbType = 'mysql' | 'postgres';

export async function connect() {
  const dbType = process.env.DB_URL.split(':')[0] as DbType;
  return await typeorm.createConnection({
    type: (process.env.DB_TYPE as DbType) || dbType,
    entities: [__dirname + '/models/*.[tj]s'],
    synchronize: true,
    url: process.env.DB_URL,
    database: process.env.DB,
    logging: process.env.DB_LOG === 'true',
    ssl: true,
  });
}

export async function getDbConnection(): Promise<typeorm.Connection> {
  let connection;
  try {
    connection = typeorm.getConnection();
  } catch (e) {
    if (e.message.indexOf('not found') < 0) {
      throw e;
    }
  }
  if (!connection || !connection.isConnected) {
    connection = await connect();
  }
  return connection;
}
export function getManager() {
  return typeorm.getManager();
}
export function getRepository(entityClass) {
  return typeorm.getRepository(entityClass);
}
