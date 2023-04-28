const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  createReaction,
  updateThought,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/react/:thoughtId/:reactionId
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
  

module.exports = router;
