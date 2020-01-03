import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/hubtasks',
      { 
        useNewUrlParser: true,
        useFindAndModify: true,
      },
    )
  }
}

export default new Database();