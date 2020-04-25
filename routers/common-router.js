var express = require('express');

var router = express.Router();

router.get('/', (req, res) => res.render('login'));
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/order', (req, res) => res.render('order'));
router.get('/user', (req, res) => res.render('user'));
router.get('/recover', (req, res) => res.render('recover'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.post('/dashboard', (req, res) => res.render('dashboard'));
router.get('/page-lockscreen', (req, res) => res.render('page/page-lockscreen'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/inbox', (req, res) => res.render('inbox'));
router.get('/mail-compose', (req, res) => res.render('mail-compose'));
router.get('/chat', (req, res) => res.render('chat'));
router.get('/calendar', (req, res) => res.render('calendar'));
router.get('/taskboard', (req, res) => res.render('taskboard'));
router.get('/map-google', (req, res) => res.render('map-google'));

//File Manager
router.get('/file-dashboard', (req, res) => res.render('file/file-dashboard'));
router.get('/file-documents', (req, res) => res.render('file/file-documents'));
router.get('/file-media', (req, res) => res.render('file/file-media'));
router.get('/file-images', (req, res) => res.render('file/file-images'));

//Blog
router.get('/blog-dashboard', (req, res) => res.render('blog/blog-dashboard'));
router.get('/blog-details', (req, res) => res.render('blog/blog-details'));
router.get('/blog-list', (req, res) => res.render('blog/blog-list'));
router.get('/blog-post', (req, res) => res.render('blog/blog-post'));
router.get('/blog-details/:id', (req, res) => res.render('blog/blog-details'));

//HTML Status
router.get('/page-404', (req, res) => res.render('page/page-404'));
router.get('/page-403', (req, res) => res.render('page/page-403'));
router.get('/page-500', (req, res) => res.render('page/page-500'));
router.get('/page-503', (req, res) => res.render('page/page-503'));

module.exports = router;