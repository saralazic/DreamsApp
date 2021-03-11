const express = require('express');
const router = express.Router();


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



/* Search (without pagination)*/
router.route('/search').get((req, res) => {
    let data = {};

    if (req.body.title != "") {
        data.title = req.body.title;
    }
    if (req.body.type != "") {
        data.type = req.body.type;
    }

    Dream.find(data)
        .then(

            found => {
                let fnd;
                if (req.body.datefrom) {
                    fnd = found.filter(i => (new Date(i.date) > (new Date(req.body.datefrom))));
                    found = fnd;
                }


                if (req.body.dateto) {
                    fnd = found.filter(i => (new Date(i.date) < (new Date(req.body.dateto))));
                    found = fnd;
                }

                res.json(found);
            })
        .catch(err => res.status(400).json('Error' + err));

});


/*Search with pagination*/
router.route('/searchPaginated').get((req, res) => {
    let data = {};

    if (req.body.title != "") {
        data.title = req.body.title;
    }
    if (req.body.type != "") {
        data.type = req.body.type;
    }

    Dream.find(data)
        .then(

            found => {
                let fnd;
                if (req.body.datefrom) {
                    fnd = found.filter(i => (new Date(i.date) > (new Date(req.body.datefrom))));
                    found = fnd;
                }


                if (req.body.dateto) {
                    fnd = found.filter(i => (new Date(i.date) < (new Date(req.body.dateto))));
                    found = fnd;
                }

                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);

                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;

                let results = {};


                if (endIndex < found.length)
                    results.next = {
                        limit: limit,
                        page: page + 1
                    };

                if (startIndex > 0)
                    results.prev = {
                        limit: limit,
                        page: page - 1
                    }


                try {
                    results.result = found.slice(startIndex, endIndex);
                    res.json(results);
                } catch {
                    err => res.status(400).json('Error: ' + err);
                }
            })
        .catch(err => res.status(400).json('Error' + err));


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


