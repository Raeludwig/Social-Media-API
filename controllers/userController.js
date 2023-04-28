const { User, Thought } = require('../models');

const userController = {
  try {
    const users = await User.find();
    .select('-__v');

    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async GetSingleUser(req, res) {
  try {
    const dbUserData = await User.findOne({ _id: req.params.userId })
      .select('-__v');
      .populate('friends')
      .populate('thoughts');

    if (!dbUserData) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async CreateUser(req, res) {
  try {
    const dbUserData = await User.create(req.body);
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},  

async UpdateUser(req, res) {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      { runValidators: true, new: true }
    );

    if (!dbUserData) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
},

async DeleteUser(req, res) {
  try {
    const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

    if (!dbUserData) {
      res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
    res.json({ message: 'User deleted with their thoughts!' });
  } catch (err) {
   console.log(err);
    res.status(500).json(err);
  }
},

async AddFriend(req, res) {
  try {
    const dbUserData = await User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true});

    if (!dbUserData) {
      res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

async RemoveFriend(req, res) {
  try {
    const dbUserData = await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true});

    if (!dbUserData) {
      res.status(404).json({ message: 'No user with that ID' });
    }




module.exports = userController;