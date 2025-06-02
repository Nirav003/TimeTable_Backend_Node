const MaxLecturesPerDay = require('../Models/MaxLecturesPerDay.module');
const { TryCatch } = require('../Utils/utility');

const createMaxLecturesPerDay = TryCatch (async (req, res, next) => {
    const { maxLectures } = req.body;
    const maxLecturesPerDay = new MaxLecturesPerDay({ maxLectures });
    await maxLecturesPerDay.save();
    res.status(201).json({
        success: true,
        message: 'MaxLecturesPerDay created successfully',
        maxlec: maxLecturesPerDay
    });
});

const getAllMaxLecturesPerDay = TryCatch(async (req, res) => {
    const maxLecturesPerDay = await MaxLecturesPerDay.find();
    res.status(200).json({
        success: true,
        message: 'All MaxLecturesPerDay',
        maxlec: maxLecturesPerDay
    });
});

const getMaxLecturesPerDay = TryCatch(async (req, res) => {
    const { id } = req.params;
    const maxLecturesPerDay = await MaxLecturesPerDay.findById(id);
    if (!maxLecturesPerDay) {
        return res.status(404).json({ error: 'MaxLecturesPerDay not found' });
    }
    res.status(200).json({
        success: true,
        message: 'MaxLecturesPerDay found',
        maxlec: maxLecturesPerDay
    });
});

const updateMaxLecturesPerDay = TryCatch(async (req, res) => {
    const { id } = req.params;    
    const { maxLectures } = req.body;
    const maxLecturesPerDay = await MaxLecturesPerDay.findByIdAndUpdate(
        id,
        { maxLectures },
        { new: true }
    );
    if (!maxLecturesPerDay) {
        return res.status(404).json({ error: 'MaxLecturesPerDay not found' });
    }
    res.status(200).json({
        success: true,
        message: 'MaxLecturesPerDay updated',
        maxlec: maxLecturesPerDay
    });
});

const deleteMaxLecturesPerDay = TryCatch(async (req, res) => {
    const { id } = req.params;
    const maxLecturesPerDay = await MaxLecturesPerDay.findByIdAndDelete(id);
    if (!maxLecturesPerDay) {
        return res.status(404).json({ error: 'MaxLecturesPerDay not found' });
    }
    res.status(200).json({ 
        success: true,
        message: 'MaxLecturesPerDay deleted' 
    });
})

module.exports = {
    createMaxLecturesPerDay,
    getAllMaxLecturesPerDay,
    getMaxLecturesPerDay,
    updateMaxLecturesPerDay,
    deleteMaxLecturesPerDay
};