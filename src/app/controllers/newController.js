class NewsController {

    // [GET] /news
    index(req, res) {
        res.render('news')
    }
    show(req, res) {
        res.send('New');
    }
}

module.exports = new NewsController();