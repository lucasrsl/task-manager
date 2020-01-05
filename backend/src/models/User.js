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
  password: {
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


export default mongoose.model('User', UserSchema);