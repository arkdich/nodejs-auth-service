import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

config({
  path: ['.env.local'],
});

export const DB_NAME = 'music_service';

const PORT_DB = Number(process.env.PORT_DB);
const DB_HOST = process.env.DB_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

if (!PORT_DB || !POSTGRES_USER || !POSTGRES_PASSWORD) {
  throw new Error(
    'Missing environment variables for database configuration, make sure .env.local is properly configured',
  );
}

export const TypeOrmSettings = TypeOrmModule.forRoot({
  type: 'postgres',
  host: DB_HOST,
  port: PORT_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
});
