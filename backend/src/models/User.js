import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function() {
  const user = this;

  if (!user.isModified('password')) return;

  user.password = await bcrypt.hashSync(user.password, 10);

});


const comparePassword = (password) => {
  return bcrypt.compareSync(password, UserSchema.passwordHash);
};

export default mongoose.model('User', UserSchema);