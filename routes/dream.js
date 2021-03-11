var express = require('express');
var router = express.Router();
let Dream = require('../models/dream.model')

/*Create*/
/*ADD new dream*/
router.route('/add').post((req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let date = req.body.date;
    let type = req.body.type;

    const newDream = new Dream({
        title,
        description,
        date,
        type
    });

    newDream.save()
        .then(() => res.json('Dream added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Read*/
/* GET dreams listing. */
router.route('/').get((req, res) => {
    Dream.find()
        .then(dreams => res.json(dreams))
        .catch(err => res.status(400).json('Error ' + err))
});

/* GET dream by id. */
router.route('/:id').get((req, res) => {
    Dream.findById(req.params.id)
        .then(dream => res.json(dream))
        .catch(err => res.status(400).json('Error: ' + err));
})

/*Update*/
/* PUT dream by id. */
router.route('/update/:id').put((req, res) => {
    Dream.findById(req.params.id)
        .then((found) => {
            found.title = req.body.title;
            found.description = req.body.description;
            found.date = req.body.date;
            found.type = req.body.type;

            found.save()
                .then(() => res.json("Dream updated"))
                .catch((err) => res.status(400).json("Error " + err))
        })
        .catch(
            (err) => res.status(400).json("Error " + err)
        );
});

/*Delete*/
/*DELETE dream by id*/
router.route('/:id').delete((req, res) => {
    Dream.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted dream"))
        .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;