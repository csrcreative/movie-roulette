const Rated = require("../models").Rated;

module.exports = {
    //TODO: ADD BULK CREATE
    create(req, res) {
        return Rated.create({
            movieid: req.body.movieid,
            listId: req.params.listid
            
        })
        .then(rated => res.status(201).send(rated))
        .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Rated.find({
            where: {
                movieid: req.params.movieid
            }
        })
            .then(rated => {
                if (!rated) {
                    return res.status(404).send({
                        message: "Rated Item Not Found"
                    });
                }

                return rated
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
}