const Rated = require("../models").Rated;

module.exports = {
    create(req, res) {
        if (req.body.length > 1) {
            console.log("BULK");
            console.log(req.body);
            return Rated.bulkCreate(req.body)
            .then(rated => res.status(201).send(rated))
            .catch(error => res.status(400).send(error));
        } else {
            console.log("SINGLE");
            console.log(req.params);
            return Rated.create({
                movieid: req.body.movieid,
                listId: req.params.listId
            })
            .then(rated => res.status(201).send(rated))
            .catch(error => res.status(400).send(error));
        }
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