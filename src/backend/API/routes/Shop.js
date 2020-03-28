const router = require('express').Router();

const verify = require('./verifyToken');


router.get('/', verify, (req, res) => {
	res.json({
		shop: {
			title: 'Joe Shmoes Pizzaria',
			description: 'Joe Shmoes Pizzaria gift card'
		}
	});
});


module.exports = router;