import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../entities/User.entity';

// Load environment variables
dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to database
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    const userRepository = AppDataSource.getRepository(User);

    // Test user credentials
    const testUsers = [
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test1234',
        role: UserRole.USER
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin1234',
        role: UserRole.ADMIN
      },
      {
        name: 'Designer User',
        email: 'designer@example.com',
        password: 'Design1234',
        role: UserRole.DESIGNER
      }
    ];

    // Clear existing test users (optional - comment out if you want to keep existing users)
    for (const userData of testUsers) {
      const existingUser = await userRepository.findOne({ where: { email: userData.email } });
      if (existingUser) {
        await userRepository.remove(existingUser);
        console.log(`🗑️  Removed existing user: ${userData.email}`);
      }
    }

    // Create users
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = userRepository.create({
        ...userData,
        password: hashedPassword
      });
      await userRepository.save(user);
      console.log(`✅ Created user: ${user.email} (${user.role})`);
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    testUsers.forEach(user => {
      console.log(`\nEmail: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Role: ${user.role}`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await AppDataSource.destroy();
    process.exit(1);
  }
};

// Run seed
seedUsers();
