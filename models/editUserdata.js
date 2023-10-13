import mongoose from 'mongoose';

const editUserDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User schema
  name: String,
  email: String,
  phone: String,
});

export default mongoose.models.EditUserData || mongoose.model('EditUserData', editUserDataSchema);
