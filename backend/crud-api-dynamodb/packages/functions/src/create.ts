import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(<string> event.body);
  console.log(event.body)
  console.log(event)
  let response = {};
  await connect('mongodb://root:example@localhost:27017/');

  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  const savedUser = await user.save();

  console.log(user.email); // 'bill@initech.com'

  return {
    statusCode: 200,
    body: JSON.stringify(savedUser ? savedUser.toObject() : {}),
  };
};