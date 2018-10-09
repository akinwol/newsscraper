
// Require all models
var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/api/scrape", function (req, res) {
        request("https://www.billboard.com/", function (error, response, html) {

            var $ = cheerio.load(html);
            var resultArray = [];

            $("section ul li").each(function (i, element) {
                var result = {};
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");

                if (result.title) {
                    // resultArray.push(result)
                    // console.log(result)
                    db.Article.create(result)
                        .then(dbArticle => {
                            console.log(dbArticle)
                            res.send(result)
                        })
                        .catch(err => {
                            return res.json(err)
                        })
                };


            });
            res.send("Scrape Complete");

        });

    });
    // route for finding an article and populating the note 
    app.get("/article/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("notes")
            .then(dbArticle => {
                res.json(dbArticle)
            })
            .catch(err => {
                res.json(err)
            })
    });
    app.post("/article/:id", function (req, res) {
        console.log(req.params.id)
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
            })
            .then(dbArticle => {
                res.json(dbArticle)
            })
            .catch(err => {
                res.json(err)
            })
    })

    // Route to add article to saved 
    app.put("/api/saved", function (req, res) {
        var id = req.body.id;
        // console.log(req.body.id)
        db.Article.findById(id, function (err, article) {
            if (err) throw err;
            article.saved = true;
            article.save(function (err, updatedArticle) {
                if (err) throw err;
                res.json(updatedArticle)
                console.log(updatedArticle)
            })
        })

    });
    // Route to remove article from saved
    app.put("/api/removesaved", function (req, res) {
        var id = req.body.id;
        // console.log(req.body.id)
        db.Article.findById(id, function (err, article) {
            if (err) throw err;
            article.saved = false;
            article.save(function (err, updatedArticle) {
                if (err) throw err;
                res.json(updatedArticle)
                console.log(updatedArticle)
            })
        })

    });



    // Route to clear articles 
    app.delete("/deleteall", function (req, res) {
        db.Article.remove({})
            .then(articleResults => {
                db.Note.remove({})
                    .then(noteRes => {
                        console.log(noteRes)
                    }).catch(err => {
                        console.log(err)
                    });
                console.log(articleResults)
            }).catch(err => {
                console.log(err)
            })

    });

    // Route to remove a note 
    app.delete("/deletenote/:id", function (req, res) {
        var noteId = req.params.id
        console.log(noteId)
        db.Note.remove({ _id: noteId })
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                res.json(err)
            })
    })

};