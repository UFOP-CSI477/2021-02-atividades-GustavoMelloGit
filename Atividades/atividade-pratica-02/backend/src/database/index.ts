import { hash } from 'bcryptjs';
import { createConnection, getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UserRepositories } from '../Repositories/UserRepositories';

createConnection().then(async (connection) => {
  console.log('Inserting a new user into the database...');
  const user = new User();

  const userRepository = getCustomRepository(UserRepositories);

  const userAlreadyExists = await userRepository.findOne({
    email: 'admin@admin.com',
  });
  if (!userAlreadyExists) {
    user.name = 'AdminUser';
    user.email = 'admin@admin.com';
    user.password = await hash('admin', 10);
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);
  }

  console.log('Loading users from the database...');
  const users = await connection.manager.find(User);
  console.log('Loaded users: ', users);
});
