// Define the product schema
import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
// Check the email addess to make sure it's unique (no existing pilot with that address).
function UserEmailValidator(email) {
    const User = mongoose.model('User');
    // Asynchronously resolve a promise to validate whether an email already exists
    return new Promise((resolve, reject) => {
        // Only check model updates for new pilots (or if the email address is updated).
        // @ts-ignore
        if (this.isNew || this.isModified('email')) {
            // Try to find a matching user
            // @ts-ignore
            User.findOne({ email }).then((err, user) => {
                // Handle errors
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                // Validate depending on whether a matching user exists.
                if (user) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        }
        else {
            resolve(true);
        }
    });
}
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            // Custom validator to check if the email was already used.
            validator: UserEmailValidator,
            message: 'This email already exists. Please try to log in instead.',
        }
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'individual',
        enum: ['individual', 'company']
    },
    firstName: String,
    lastName: String,
    address: String,
    postalCode: String,
    city: String,
    state: { type: String },
    country: { type: String, default: 'FI' },
    created: { type: Date, default: Date.now },
    businessName: String,
    // Stripe account ID to send payments obtained with Stripe Connect.
    stripeAccountId: String,
    onboardingComplete: Boolean
});
// Return a pilot name for display.
userSchema.methods.displayName = function () {
    if (this.type === 'company') {
        return this.businessName;
    }
    else {
        return `${this.firstName} ${this.lastName}`;
    }
};
// TODO // List rides of the past week for the pilot.
// userSchema.methods.listRecentRides = function() {
//     const weekAgo = Date.now() - (7*24*60*60*1000);
//     return Ride.find({ pilot: this, created: { $gte: weekAgo } })
//         .populate('passenger')
//         .sort({ created: -1 })
//         .exec();
// };
// Generate a password hash (with an auto-generated salt for simplicity here).
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 8);
};
// Check if the password is valid by comparing with the stored hash.
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
// Get the first fully onboarded pilot.
userSchema.statics.getFirstOnboarded = function () {
    return UserModel.findOne({ stripeAccountId: { $ne: null } })
        .sort({ created: 1 });
};
// Get the latest fully onboarded pilot.
userSchema.statics.getLatestOnboarded = function () {
    return UserModel.findOne({ stripeAccountId: { $ne: null } })
        .sort({ created: -1 });
};
// Pre-save hook to define some default properties for pilots.
userSchema.pre('save', function (next) {
    // Make sure certain fields are blank depending on the pilot type.
    let user = this;
    if (this.isModified('type')) {
        if (user.type === 'individual') {
            user.businessName = null;
        }
        else {
            user.firstName = null;
            user.lastName = null;
        }
    }
    // Make sure the password is hashed before being stored.
    if (this.isModified('password')) {
        // @ts-ignore
        this.password = this.generateHash(this.password);
    }
    next();
});
// Create a Mongoose model based on the schema
export const UserModel = mongoose.model('User', userSchema);
