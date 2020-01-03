const mongoose = require('mongoose');

const Status = Object.freeze({
  ToDo: 'todo',
  Doing: 'doing',
  Done: 'done',
});

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  
  },
  description: {
    type: String,
    required: true,  
  },
  user: {
    type: Number,
    required: true,
  },
  deadLine: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: 'todo', 
  },
}, {
  timestamps: true,
});

Object.assign(TaskSchema.statics, {
  Status,
});

export default mongoose.model('Task', TaskSchema);