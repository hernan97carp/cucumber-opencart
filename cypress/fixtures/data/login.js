import { faker } from '@faker-js/faker';
const loginData = {
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	email: faker.internet.email(),
	telephone: faker.phone.number(),
	password: faker.internet.password(),
	longName: faker.name.firstName().padEnd(40, 'x'),
	newEmail: faker.internet.email(),
};
module.exports = {
	loginData,
};
