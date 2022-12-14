const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// name , email ,photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please tell us your name"],
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	photo: {
		type: String,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 8,
		select: false,
	},
	password_confirmation: {
		type: String,
		required: [true, "Please confirm your password"],
		validate: {
			// this only works for CREATE and SAVE
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords are not the same ",
		},
	},
});

userSchema.pre("save", async function (next) {
	// Only run this function if password was modified
	if (!this.isModified("password")) return next();

	// Hash the password with cost 12
	this.password = await bcrypt.hash(this.password, 12);

	// Delete password confirm field
	this.password_confirmation = undefined;
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
