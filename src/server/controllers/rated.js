const Rated = require("../models").Rated;

module.exports = {
    create(req, res) {
        if (req.body.length > 1) {
            return Rated.bulkCreate(req.body)
            .then(rated => res.status(201).send(rated))
            .catch(error => res.status(400).send(error));
        } else {
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
    },
    retrieve(req, res) {
        return Rated.find({
          where: {
              listId: req.params.listId,
              movieid: req.params.movieid
          }
      })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "Rated Movie Not Found"
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    }
}