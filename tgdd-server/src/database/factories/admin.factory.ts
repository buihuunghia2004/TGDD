import { AdminEntity } from '@/api/admin/entities/admin.entity';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(AdminEntity, (fake) => {
  const admin = new AdminEntity();

  const firstName = fake.person.firstName();
  const lastName = fake.person.lastName();
  admin.firstName = firstName;
  admin.lastName = lastName;
  admin.username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
  admin.phoneNumber = fake.phone.number();
  admin.email = fake.internet.email({ firstName, lastName });
  admin.password = '12345678';
  admin.dob = fake.date.birthdate();
  admin.isActive = true;
  admin.image = fake.image.avatar();
  admin.roles = [];
  admin.createdBy = SYSTEM_USER_ID;
  admin.updatedBy = SYSTEM_USER_ID;
  return admin;
});
