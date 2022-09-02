import mongoose, { Document, Schema } from 'mongoose';

export interface user {
	name: string;
	points: number;
}

export interface userModel extends user, Document {}

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		points: { type: Number, required: true }
	},
	{
		versionKey: false
	}
);

export default mongoose.model<userModel>('User', UserSchema);
