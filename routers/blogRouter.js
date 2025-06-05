const { Router } = require("express");

const blogRouter = Router();
const blogController = require('../controllers/blogController');
const passport = require("passport");
const imgupload = require('../middleware/imageUpload');

blogRouter.get('/signup',blogController.signupPage);
blogRouter.post('/adminCreate',blogController.signup);
blogRouter.get('/signin',blogController.signinPage);
blogRouter.post('/signin',passport.authenticate('local',{failureRedirect:'pages/signin' }),blogController.signin);
blogRouter.use(passport.userAuth);
blogRouter.get('/index',blogController.homePage);
blogRouter.get("/blog", blogController.blogPage);
blogRouter.post("/addblog", imgupload, blogController.addblog);
blogRouter.get("/deleteBlog/:id", blogController.deletePage);
blogRouter.get("/editBlog/:id", blogController.editPage);
blogRouter.post("/upadate/:id", imgupload, blogController.edit);
blogRouter.get("/viewBlog/:id", blogController.viewPage);
blogRouter.get("/back", blogController.backPage);
blogRouter.get("/about", blogController.aboutPage);
blogRouter.get("/addblog", blogController.addblogPage);
blogRouter.get("/features", blogController.featurePage);
blogRouter.get("/contact", blogController.contactPage);
blogRouter.get('/profile',blogController.profile);
blogRouter.get('/logout',blogController.logOutPage);
blogRouter.get('/editProfile',blogController.editProfile);

blogRouter.get('/change',blogController.changePasswordPage);
blogRouter.post('/change',blogController.changePassword);

module.exports = blogRouter;