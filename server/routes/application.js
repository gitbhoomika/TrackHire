const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');



const JobApplication = require('../models/Application');

router.post('/', authmiddleware, async (req, res) => {
    const { company, position, status } = req.body;
    const userId = req.user.id;

    try {
        const newApplication = new JobApplication({
            user: userId,
            company,
            position,
            status
        });
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

});


router.get('/', authmiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const applications = await JobApplication.find({ user: userId });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
});


router.put('/:id', authmiddleware, async (req, res) => {
    const { company, position, status } = req.body;
    const userId = req.user.id;
    const applicationId = req.params.id;

    try {
        const application = await JobApplication.findOne({ _id: applicationId, user: userId });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

       if (company !== undefined) {
    application.company = company;
}

if (position !== undefined) {
    application.position = position;
}

if (status !== undefined) {
    application.status = status;
}

        await application.save();
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', authmiddleware, async (req, res) => {
    const userId = req.user.id;
    const applicationId = req.params.id;

    try {
        const application = await JobApplication.findOne({ _id: applicationId, user: userId });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        await application.deleteOne();
        res.json({ message: 'Application deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;