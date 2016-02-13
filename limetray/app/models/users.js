var mongoose = require ('mongoose'),
	Schema = mongoose.Schema,
	userSchema, userModel;

userSchema = new Schema ({
	local: {
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	}
});
userSchema.methods.validPassword = function (password) {
	return (this.local.password === password);
};

userModel = mongoose.model ('users', userSchema);