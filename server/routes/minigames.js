const express = require('express')
const router = express.Router()
const Minigame = require('../models/Minigame')

// GET all minigames
router.get('/', async (_req, res) => {
  try {
    const minigames = await Minigame.find()
    res.json(minigames)
  } catch (error) {
    console.log('Error finding minigames', error.message)
    res.status(500).json({
      message: 'Error finding minigames',
      error
    })
  }
})

module.exports = router
