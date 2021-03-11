var express = require('express');
var router = express.Router();
let Type = require('../models/type.model')

/*Create*/
/*ADD new type*/
router.route('/add').post((req, res) => {
    let type = req.body.type;

    const newType = new Type({
       type
    });

    newType.save()
        .then(() => res.json('Type added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Read*/
/* GET types listing. */
router.route('/').get( (req, res) => {
    Type.find()
        .then(types => res.json(types))
        .catch(err => res.status(400).json('Error '+err))
});

/* GET type by id. */
router.route('/:id').get((req, res)=>{
    Type.findById(req.params.id)
        .then(type => res.json(type))
        .catch(err => res.status(400).json('Error: '+err));
})

/*Update*/
/* PUT type by id. */
router.route('/update/:id').put((req, res)=>{
    Type.findById(req.params.id)
        .then((found)=> {
            found.type = req.body.type; 

            found.save()
                .then(() => res.json("Type updated"))
                .catch((err) => res.status(400).json("Error "+err)) 
            })
            .catch(
                (err) => res.status(400).json("Error "+err) 
            );
});

/*Delete*/
/*DELETE type by id*/ 
router.route('/:id').delete((req, res) => {
    Type.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted user"))
    .catch(err => res.status(400).json('Error'+err));
});

module.exports = router;
