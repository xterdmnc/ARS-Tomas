const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model');

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const { lastName, firstName, email, username, password, confirm, role } = req.body;

            // Validate data if necessary (e.g., check password match)
            if (password !== confirm) {
                return res.status(400).json({ success: false, message: 'Passwords do not match' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user to database
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
            res.status(500).json({ success: false, error: 'Server error' });
        }
    },

    LoginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find user by username
            const user = await UserModel.findOne({ username });

            if (user) {
                // Compare passwords
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    // Passwords match, login successful
                    res.json({ success: true, message: 'User logged in successfully', role: user.role });
                } else {
                    // Passwords do not match
                    res.status(401).json({ success: false, message: 'Password is incorrect' });
                }
            } else {
                // User not found
                res.status(404).json({ success: false, message: 'Username not found' });
            }
        } catch (error) {
            console.error(`LoginUser error: ${error}`);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },

    EditUser: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Update user by ID
            const user = await UserModel.findByIdAndUpdate(id, updates, { new: true });

            if (user) {
                res.json({ success: true, message: 'User updated successfully!', user });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error(`EditUser in user controller error: ${error}`);
            res.status(500).json({ success: false, error: 'Server error' });
        }
    },

    DeleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            // Delete user by ID
            await UserModel.findByIdAndDelete(id);

            res.json({ success: true, message: 'User deleted successfully!' });
        } catch (error) {
            console.error(`DeleteUser in user controller error: ${error}`);
            res.status(500).json({ success: false, error: 'Server error' });
        }
    },

    ListUsers: async (req, res) => {
        try {
            // Find all users
            const users = await UserModel.find();

            res.json({ success: true, users });
        } catch (error) {
            console.error(`ListUsers in user controller error: ${error}`);
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
};

module.exports = UserController;
