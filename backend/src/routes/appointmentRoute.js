const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.post('/appointments', auth, appointmentController.createAppointment);
router.get('/appointments', auth, appointmentController.getUserAppointments);
router.patch('/appointments/:id', auth, appointmentController.updateAppointment);
router.delete('/appointments/:id', auth, appointmentController.cancelAppointment);

module.exports = router;
