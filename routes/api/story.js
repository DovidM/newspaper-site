const router = require('express').Router();
const Article = require("../../controller/classes/Article");
const Comment = require("../../controller/classes/Comment");


router.get("/:issueNum?", async function(req, res) {

    const ArticleInstance = new Article();
    const CommentInstance = new Comment();

    await ArticleInstance.defineInfoFor(req.query.issue, req.query.name);

    res.send({
        body: ArticleInstance.getBody(),
        tags: ArticleInstance.listTags(),
        can_edit: ArticleInstance.canEdit(),
        id: ArticleInstance.getId(),
        comments: await CommentInstance.getAllByArticle(req.query.issue, req.query.name)
    });
});

module.exports = router