const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.model');

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const { lastName, firstName, email, username, password, confirm, role } = req.body;

            if (password !== confirm) {
                return res.status(400).json({ success: false, message: 'Passwords do not match' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                lastName,
                firstName,
                email,
                username,
                password: hashedPassword,
                role
            });

            const data = await newUser.save();
            res.status(201).json({ success: true, message: 'User created successfully!', data });
        } catch (error) {
            console.error(`CreateUser in user controller error: ${error}`);
            res.json({ success: false, error: 'Server error' });
        }
    },

    LoginUser: async (req, res) => {
        console.log('Received request:', req.url);
        try {
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username: username });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
                    res.json({ success: true, message: 'User logged in successfully', token, role: user.role });
                } else {
                    res.json({ success: false, message: 'Password is incorrect' });
                }
            } else {
                res.json({ success: false, message: 'Username not found' });
            }
        } catch (error) {
            console.error(`LoginUser error: ${error}`);
            res.json({ success: false, message: 'Server error' });
        }
    },

    EditUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { lastName, firstName, email, username, password, role } = req.body;

            const updates = { lastName, firstName, email, username, role };

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updates.password = hashedPassword;
            }

            const user = await UserModel.findByIdAndUpdate(id, updates, { new: true });

            if (user) {
                res.json({ success: true, message: 'User updated successfully!', user });
            } else {
                res.json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error(`EditUser in user controller error: ${error}`);
            res.json({ success: false, error: 'Server error' });
        }
    },

    DeleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            await UserModel.findByIdAndDelete(id);
            res.json({ success: true, message: 'User deleted successfully!' });
        } catch (error) {
            console.error(`DeleteUser in user controller error: ${error}`);
            res.json({ success: false, error: 'Server error' });
        }
    },

    ListUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json({ success: true, users });
        } catch (error) {
            console.error(`ListUsers in user controller error: ${error}`);
            res.json({ success: false, error: 'Server error' });
        }
    }
};

module.exports = UserController;
