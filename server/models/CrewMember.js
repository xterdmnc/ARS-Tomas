const mongoose = require('mongoose');

const CrewMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
});

const CrewMember = mongoose.model('CrewMember', CrewMemberSchema);

module.exports = CrewMember;
