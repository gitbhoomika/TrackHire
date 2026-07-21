const express=require('express');
const router=express.Router();
const authRoutes=require('./auth');
const applicationRoutes=require('./application');
const aiRoutes = require("./ai");
router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);
router.use("/ai", aiRoutes);
router.get('/', (req, res) => {
    res.send('Internship Tracker API is running');
});

module.exports=router;