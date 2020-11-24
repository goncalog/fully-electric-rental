const express = require('express');
const router = express.Router();
const evController = require('../controllers/evController');
const makeController = require('../controllers/makeController');
const modelController = require('../controllers/modelController');
const locationController = require('../controllers/locationController');
const sellerController = require('../controllers/sellerController');
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

// POST request to sign up seller
router.post('/seller/signup', sellerController.signUp);

// POST request to log in seller
router.post('/seller/login', sellerController.logIn);

// POST request to log out seller
router.post('/seller/logout', sellerController.logOut);

// GET request to list of the seller's evs
router.get('/seller/evs', withAuth, sellerController.getEvs);

// GET request to check log in status
router.get('/seller/checkAuth', withAuth, sellerController.checkAuth);

// GET request to get a seller's list of evs for sale
router.get('/seller/:id/evs', sellerController.getSellerEvs);

// POST request to create new ev
router.post('/seller/:id/ev/create', withAuth, sellerController.postCreateEv);

// GET request to update ev
router.get('/seller/:id/ev/:id/update', withAuth, sellerController.getUpdateEv);

// PUT request to update ev
router.put('/seller/:id/ev/:id/update', withAuth, sellerController.putUpdateEv);

// DELETE request to delete ev
router.delete('/seller/:id/ev/:id/delete', withAuth, sellerController.deleteEv);

// POST request to contact seller
router.post('/seller/:id/contact', sellerController.postContactSeller);

// Placeholder code for testing POST routes
router.get('/test', evController.getTest);

router.post('/test', evController.postTest);

module.exports = router;
