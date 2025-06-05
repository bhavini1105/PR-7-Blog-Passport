const Admin = require("../models/adminModel");
const Blog = require("../models/blogModel");
const fs = require('fs');
const Profile = require("../models/profileModel");


module.exports.homePage = async (req, res) => {
    try {
        let blogs = await Blog.find();
        return res.render('index', {blogs});
    } catch (error) {
        console.log(error.message);
        return res.render('index', {blogs,
            success: req.flash("success"),
            error: req.flash("error")
        });

    }
};

module.exports.blogPage = async (req, res) => {
    try {
        let blogs = await Blog.find();
        return res.render('pages/blog', { blogs });
    } catch (error) {
        console.error(error);
        return res.render('pages/blog', { blogs: [] });
    }
};

module.exports.backPage = (req, res) => {
    return res.redirect('blog');
};

module.exports.addblogPage = (req, res) => {
    return res.render('pages/addblog');
}

module.exports.aboutPage = (req, res) => {
    return res.render('pages/about');
}

module.exports.featurePage = (req, res) => {
    return res.render('pages/feature');
}


module.exports.addblog = async (req, res) => {
    try {
        let update = { ...req.body, imgurl: req.file.path };
        let blogs = await Blog.create(update);
        console.log("created..");
        return res.render('pages/addblog');

    } catch (error) {
        console.log(error.message);
        return res.render('pages/addblog');
    }

}

module.exports.deletePage = async (req, res) => {
    try {
        let { id } = req.params;

        let blog = await Blog.findByIdAndDelete(req.params.id);
        fs.unlinkSync(blog.imgurl);
        console.log("Deleted Suceesfully....")
        return res.redirect('/blog');

    } catch (error) {
        console.log(error.message);
        return res.redirect('/blog');
    }
}

module.exports.editPage = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await Blog.findById(id);
        return res.render('pages/editblog', { blog });

    } catch (error) {
        console.log(error.message);
        return res.render('pages/editblog', { blog: [] });
    }
}

module.exports.edit = async (req, res) => {
    try {
        let { id } = req.params;
        let updateData = { ...req.body };

        if (req.file) {
            let blog = await Blog.findById(id);
            if (blog.imgurl) {
                fs.unlinkSync(blog.imgurl);
            }
            updateData.imgurl = req.file.path;
        }
        else {
            updateData.imgurl = req.body.old_imgurl;
        }

        await Blog.findByIdAndUpdate(id, updateData);
        return res.redirect('/blog');


    } catch (error) {
        return res.redirect('/blog');

    }
}

module.exports.viewPage = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        return res.render('pages/viewblog', { blog });
    } catch (error) {
        console.log(error.message);
        return res.render('pages/viewblog', { blog: [] });
    }
}

module.exports.contactPage = async (req, res) => {
    return res.render('pages/contact');
}

module.exports.signupPage = (req, res) => {
    return res.render('pages/signup');
}

module.exports.signup = async (req, res) => {
    try {
        let { username, password, email, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.render('pages/signup');
        }

        let user = await Admin.create({ username, password });

        return res.render('pages/signin', user);

    } catch (error) {
        return res.render('pages/signup');
    }
}

module.exports.signinPage = (req, res) => {
    return res.render('pages/signin');
}

module.exports.signin = (req, res) => {
    req.flash("success", "Login Successfully");
    return res.redirect('/index');
}

module.exports.profile = (req, res) => {
    return res.render('pages/profile')
}

module.exports.changePasswordPage = (req, res) => {
    return res.render('pages/changePassword');
}

module.exports.logOutPage = (req, res) => {
    req.logOut(() => {
        return res.redirect('/signin')
    })
}

module.exports.changePassword = async (req, res) => {
    const { current_password, new_password, confirm_password } = req.body;
    const { id } = req.user;

    let user = await Admin.findById(id);

    if (current_password === user.password) {
        if (new_password === confirm_password) {
            req.flash("success", "Password Changed Successfully");
            user.password = new_password;
            await user.save();
            return res.redirect('/logout');
        }
        else {
            req.flash("error", "Password not matched.");
            return res.redirect(req.get('Referrer') || '/change');
        }
    }
    else {
        req.flash("error", "Current Password is invalid..");
        return res.redirect(req.get('Referrer') || '/change');
    }
}

module.exports.editProfile = (req, res) => {

    let { id } = req.user;
    console.log(id);

}