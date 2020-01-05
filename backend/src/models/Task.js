import mongoose from 'mongoose';

const Status = Object.freeze({
  ToDo: 'todo',
  Doing: 'doing',
  Done: 'done',
  Late: 'late',
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
  deletedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

Object.assign(TaskSchema.statics, {
  Status,
});

export default mongoose.model('Task', TaskSchema);