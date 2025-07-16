const AccessPassageModel = require('../modules/passageModel')

exports.passageController = async (req, res, next) => {
    const createPassage = req.body;
    try {

        const newPassage = new AccessPassageModel(createPassage);
        await newPassage.save();
        console.log(newPassage);
        res.json({
            isAuth: true,
            errormsg: "Passage upload successfully",
            value: newPassage
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}


exports.listPassageController = async (req, res, next) => {
    const createPassage = req.body;
    try {

        const listPassage = await AccessPassageModel.find();
        res.json({
            isAuth: true,
            errormsg: "Passage list send successfully",
            value: listPassage
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}


exports.updatePassageController = async (req, res, next) => {
    const updatePassage = req.body;
    try {

        const Passage = await AccessPassageModel.updateOne(
            { _id: updatePassage._id },
            {
                $set: {
                    answer: updatePassage.answer,
                    question: updatePassage.question,
                }
            }
        );
        res.json({
            isAuth: true,
            errormsg: "Passage list send successfully",
            value: updatePassage
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}

exports.testController = async (req, res, next) => {
    try {
        // If you want to access data from the request, use req.body / req.params / req.query
        // Example:
        // const data = req.body;

        res.json({
            isAuth: true,
            errormsg: "Test controller executed successfully",
        });
    } catch (err) {
        console.error("Test controller error:", err);
        res.status(500).json({
            isAuth: false,
            errormsg: "Error in test controller",
        });
    }
};

exports.deletePassageController = async (req, res, next) => {
    const requestData = req.body;
    try {
        const employeeDelete = await AccessPassageModel.deleteOne({ _id: requestData._id });
        console.log(employeeDelete)
        res.json({
            isAuth: true,
            errormsg: "Deleted successfully",
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}