import mongoose from 'mongoose';

const JwtBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,  
  },
}, {
  timestamps: true,
});

export default mongoose.model('JwtBlacklist', JwtBlacklistSchema);