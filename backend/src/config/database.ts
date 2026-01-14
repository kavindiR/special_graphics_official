import { DataSource } from 'typeorm';
import { User } from '../entities/User.entity';
import { Design } from '../entities/Design.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'special_graphics',
  entities: [User, Design],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in development
  logging: process.env.NODE_ENV === 'development',
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ PostgreSQL database connected successfully');
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await AppDataSource.destroy();
      console.log('Database connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
