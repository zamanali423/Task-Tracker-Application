const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Ensure user.tokens is an array before pushing the new token
    user.tokens = user.tokens || [];
    user.tokens.push({ token });

    user.save();
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = generateToken;
