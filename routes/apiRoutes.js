
// Require all models
var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/api/scrape", function (req, res) {
        request("https://www.billboard.com/", function (error, response, html) {

            var $ = cheerio.load(html);
            var results = {};
            $("section ul li").each(function (i, element) {
                results.title = $(this).children("a").text();
                results.link = $(this).children("a").attr("href");
                db.Article.create(results)
                    .then(dbArticle => {
                        console.log(dbArticle)
                    })
                    .catch(err => {
                        return res.json(err)
                    })
            });
            // res.json(results)
            //   console.log(results)

        });

    });
    // route for finding an article and populating the note 
    app.get("/article/:id", function(req,res){
        console.log(req.params.id)
        db.Article.findOne({_id:req.params.id})
        .populate("Note")
        .then(dbArticle =>{
            res.json(dbArticle)
        })
        .catch(err =>{
            res.json(err)
        })
    });

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
            .then(results =>{
                console.log(results)
            })
            .catch(err =>{
                console.log(err)
            })
    });

};