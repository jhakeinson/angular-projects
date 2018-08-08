var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
	title: {
		type: String,
		index: true,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	category: {
		type: String,
		index: true,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var Article = module.exports = mongoose.model("Article", articleSchema);

// Get all articles
module.exports.getArticles = function(callback) {
	Article.find(callback);
}

// Get article by ID
module.exports.getArticleById = function(id, callback) {
	Article.findById(id, callback);
}

// Get article by category
module.exports.getArticlesByCategory = function(category, callback) {
	var query = {category: category};
	Article.find(query, callback);
}

// ADD article
module.exports.addArticle = function(newCategory, callback) {
	newCategory.save(callback);
}

// UPDATE ARTIICLE
module.exports.updateArticle = function(id, data, callback) {
	var title = data.title;
	var content = data.content;
	var category = data.category;

	Article.findById(id, function(err, article) {
		if(!article) {
			return new Error("This article doesn't exist.");
		} else {
			article.title = title;
			article.content = content;
			article.category = category;

			article.save(callback);
		}
	});
}

// reemove article
module.exports.removeArticle = function(id, callback) {
	Article.find({_id: id}).remove(callback);
}
