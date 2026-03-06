const doctorRouter = require('express').Router();

doctorRouter.get('/doctors', (req, res) => {
    res.send('List of doctors');
});

module.exports = doctorRouter;