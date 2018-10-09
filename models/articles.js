var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note",
        // unique: true
    }]

});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;