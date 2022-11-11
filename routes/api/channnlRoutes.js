const router = require('express').Router();
const {
  getChannels,
  getSingleChannel,
  createChannel,
  updateChannel,
  deleteChannel,
} = require('../../controllers/channelController.js');

// /api/channels
router.route('/').get(getChannels).post(createChannel);

// /api/channels/:channelId
router
  .route('/:channelId')
  .get(getSingleChannel)
  .put(updateChannel)
  .delete(deleteChannel);

module.exports = router;
