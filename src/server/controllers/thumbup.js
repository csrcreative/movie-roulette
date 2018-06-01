const ThumbUp = require("../models").ThumbUp;

module.exports = {
    create(req, res) {
        return ThumbUp.create({
            movieid: req.body.movieid,
            title: req.body.title,
            image: req.body.image,
            listId: req.params.listid
            
        })
        .then(thumbup => res.status(201).send(thumbup))
        .catch(error => res.status(400).send(error));
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
}