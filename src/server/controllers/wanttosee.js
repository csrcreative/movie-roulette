const WantToSee = require("../models").WantToSee;

module.exports = {
    create(req, res) {
        if (req.body.length > 1) {
            return WantToSee.bulkCreate(req.body)
            .then(wanttosee => res.status(201).send(wanttosee))
            .catch(error => res.status(400).send(error));
        } 
        else {
            return WantToSee.create({
                movieid: req.body[0].movieid,
                title: req.body[0].title,
                image: req.body[0].image,
                listId: req.body[0].listId
            })
                .then(wanttosee => res.status(201).send(wanttosee))
                .catch(error => res.status(400).send(error));
        }
    },
    destroy(req, res) {
        return WantToSee.find({
            where: {
                movieid: req.params.movieid
            }
        })
            .then(wantToSee => {
                if (!wantToSee) {
                    return res.status(404).send({
                        message: "Want To See Item Not Found"
                    });
                }

                return wantToSee
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
}