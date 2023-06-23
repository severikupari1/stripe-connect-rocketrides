import { Schema, model, connect } from 'mongoose';
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});
// 3. Create a Model.
const User = model('User', userSchema);
export const main = async (event) => {
    const data = JSON.parse(event.body);
    console.log(event.body);
    console.log(event);
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
