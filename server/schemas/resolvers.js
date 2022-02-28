const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (paretn, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Please login");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await user.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await user.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Email does not exist");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, contect) => {
      if (contect.user) {
        const updateUser = await user.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { saveBook: bookData },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updateUser;
      }
      throw new AuthenticationError("Please login");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
