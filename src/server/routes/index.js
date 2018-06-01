const listsCtrl = require("../controllers").lists;
const thumbCtrl = require("../controllers").thumbup;
const rateCtrl = require("../controllers").rated;
const wantCtrl = require("../controllers").wanttosee;

module.exports = app => {
    app.get("/api", (req, res) =>
        res.status(200).send({
            message: "Welcome to the Todos API!"
        })
    );

    //get all lists
    app.get('/api/lists', listsCtrl.list);

    //create a list
    app.post('/api/lists/', listsCtrl.create);

    //get list by listkey (timestamp)
    app.get('/api/lists/:listkey', listsCtrl.retrieve);
    
    //delete a list
    //app.delete('/api/lists/', listsCtrl.destroy);

    //add a rated movie
    app.post('/api/lists/:listid/rated', rateCtrl.create);

    //delete a rated
    app.delete('/api/lists/:listid/rated/:movieid', rateCtrl.destroy);

    //add a thumb up movie
    app.post('/api/lists/:listid/thumbup', thumbCtrl.create);

    //delete a thumb up movie
    app.delete('/api/lists/:listid/thumbup/:movieid', thumbCtrl.destroy);

    //add a want to see movie
    app.post('/api/lists/:listid/wanttosee', wantCtrl.create);

    //delete a want to see movie
    app.delete('/api/lists/:listid/wanttosee/:movieid', wantCtrl.destroy);



};
