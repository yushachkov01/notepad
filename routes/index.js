let express = require('express');
let SaveForm = require('../models/form')
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save/:id', async (req, res) => {
  console.log("save---------------");
  const id = req.params.id
  const { text, topic } = req.body
  await SaveForm.findByIdAndUpdate(id, { text, topic })
  res.sendStatus(200)
})

router.get('/recordings', async (req, res) => {
  const recordings = await SaveForm.find({ author: req.session.user }).populate('author')
  console.log(recordings);
  res.render('recordings', { recordings })
})
router.post('/new', async (req, res) => {
  const { text, topic } = req.body
  await SaveForm.create({ text, topic, author: req.session.user })
  res.redirect('/recordings')

})

router.delete('/recordings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await SaveForm.findByIdAndDelete(id);
    res.sendStatus(200)
  } catch (e) {
    return res.send(e);
  }
});
router.get('/edit/:id', async (req, res) => {
  const id = req.params.id
  const currentEntry = await SaveForm.findById(id)
  res.render('edit-article', { currentEntry })
})



module.exports = router;
