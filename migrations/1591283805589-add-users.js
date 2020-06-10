const USERS = require('./data/migrations-users').USERS;
const UserSchema = require('./schema/user-schema');
const bcrypt = require('bcryptjs');

async function up () {
  const users = USERS.map((user) => {
    user.salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, user.salt);
    return user;
  })
  await UserSchema.insertMany(users);
}

async function down () {
  const users = await Promise.all(
    USERS.map((user) => { 
      return UserSchema.find({ username: { $eq: user.username }});
    })
  );
  try {
    UserSchema.deleteMany(users);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { up, down };
