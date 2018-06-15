const ThumbUp = require("../models").ThumbUp;

module.exports = {
    create(req, res) {
        if (req.body.length > 1) {
            return ThumbUp.bulkCreate(req.body)
            .then(thumbup => res.status(201).send(thumbup))
            .catch(error => res.status(400).send(error));
        } 
        else {
            return ThumbUp.create({
                movieid: req.body[0].movieid,
                title: req.body[0].title,
                image: req.body[0].image,
                listId: req.body[0].listId
            })
                .then(thumbup => res.status(201).send(thumbup))
                .catch(error => res.status(400).send(error));
        }
    },
    destroy(req, res) {
        return ThumbUp.find({
            where: {
                movieid: req.params.movieid
            }
        })
            .then(thumbUp => {
                if (!thumbUp) {
                    return res.status(404).send({
                        message: "Thumb Up Item Not Found"
                    });
                }

                return thumbUp
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
