const List = require("../models").List;
const Rated = require("../models").Rated;
const ThumbUp = require("../models").ThumbUp;
const WantToSee = require("../models").WantToSee;

module.exports = {
    create(req, res) {
        return List.create({
            listkey: req.body.listkey
        })
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return List.findAll({
            include: [
                {
                    model: Rated,
                    as: "Rated"
                },
                {
                    model: ThumbUp,
                    as: "ThumbUp"
                },
                {
                    model: WantToSee,
                    as: "WantToSee"
                }
            ]
        })
            .then(lists => res.status(200).send(lists))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return List.find({
          where: {
              listkey: req.params.listkey,
          },
          include: [
            {
                model: Rated,
                as: "Rated"
            },
            {
                model: ThumbUp,
                as: "ThumbUp"
            },
            {
                model: WantToSee,
                as: "WantToSee"
            }
        ]
      })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User Not Found"
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    }
};
