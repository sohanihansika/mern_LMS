const { Signup , Login} = require('../Controllers/AuthoController')
const router = require ('express').Router()

router.post('/Signup',Signup)
router.post('/Lignup',Lignup)

module.exports = router