import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://ricardo:ricardo@hubtec-test-sxnej.mongodb.net/test?retryWrites=true&w=majority',
      { 
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      },
    );
  }
}

export default new Database();