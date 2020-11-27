const express = require('express');
const router = express.Router();
const evController = require('../controllers/evController');
const makeController = require('../controllers/makeController');
const modelController = require('../controllers/modelController');
const locationController = require('../controllers/locationController');
const ownerController = require('../controllers/ownerController');
const withAuth = require('../auth/authMiddleware');

// GET request for home page
router.get('/', evController.index);

// GET request for list of all evs
router.get('/evs', evController.getEvs);

// GET request for data to create new ev
router.get('/ev/create', evController.getCreateEv);

// GET request for unique ev
router.get('/ev/:id', evController.getUniqueEv);

// GET request for make
router.get('/make/:id', makeController.getMake);

// GET request for list of all makes
router.get('/makes', makeController.getMakes);

// GET request for make's models
router.get('/make/:id/models', makeController.getModels);

// GET request for model
router.get('/model/:id', modelController.getModel);

// GET request for list of all models
router.get('/models', modelController.getModels);

// GET request for list of all locations
router.get('/locations', locationController.getLocations);

// POST request to sign up owner
router.post('/owner/signup', ownerController.signUp);

// POST request to log in owner
router.post('/owner/login', ownerController.logIn);

// POST request to log out owner
router.post('/owner/logout', ownerController.logOut);

// GET request to list of the owner's evs
router.get('/owner/evs', withAuth, ownerController.getEvs);

// GET request to check log in status
router.get('/owner/checkAuth', withAuth, ownerController.checkAuth);

// GET request to get a owner's list of evs for sale
router.get('/owner/:id/evs', ownerController.getOwnerEvs);

// POST request to create new ev
router.post('/owner/:id/ev/create', withAuth, ownerController.postCreateEv);

// GET request to update ev
router.get('/owner/:id/ev/:id/update', withAuth, ownerController.getUpdateEv);

// PUT request to update ev
router.put('/owner/:id/ev/:id/update', withAuth, ownerController.putUpdateEv);

// DELETE request to delete ev
router.delete('/owner/:id/ev/:id/delete', withAuth, ownerController.deleteEv);

// POST request to contact owner
router.post('/owner/:id/contact', ownerController.postContactOwner);

// Placeholder code for testing POST routes
router.get('/test', evController.getTest);

router.post('/test', evController.postTest);

module.exports = router;
