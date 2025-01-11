const Committee = require('../Models/committee.module.js');
const { User } = require('../Models/user.module.js');
const { TryCatch } = require('../Utils/utility.js'); 

const addCommitteeMember = TryCatch(async (req, res) => {
    const { committeeId, members } = req.body;

    const committee = await Committee.findById(committeeId);
    if (!committee) {
        return res.status(404).json({ message: 'Committee not found' });
    }

    for (const member of members) {
        const user = await User.findById(member);
        if (!user || user.role !== 'management') {
            continue;
        }

        const isMemberAlreadyInCommittee = committee.members.some(m => m.toString() === member);
        if (!isMemberAlreadyInCommittee) {
            committee.members.push(member);
        }
    }

    await committee.save();
    res.status(200).json({ 
        success: true,
        message: 'Members added successfully', 
        committee 
    });
});

const removeCommitteeMember = TryCatch(async (req, res) => {
    const { committeeId, members } = req.body;

    const committee = await Committee.findById(committeeId);
    if (!committee) {
        return res.status(404).json({ message: 'Committee not found' });
    }

    committee.members = committee.members.filter(m => !members.some(member => member.userId === m.userId.toString()));

    await committee.save();
    res.status(200).json({ 
        success: true,
        message: 'Members removed successfully', 
        committee 
    });
});

module.exports = {
    addCommitteeMember,
    removeCommitteeMember
};