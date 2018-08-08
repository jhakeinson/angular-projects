/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //Sign user up
    signup: function(req, res) {
        console.log("Backend Sig up!");

        var Passwords = require("machinepack-passwords");

        Passwords.encryptPassword({
            password: req.param("password"),
            difficulty: 10
        }).exec({
            error: function(err) {
                return res.negotiate(err);
            },
            success: function(encryptedPassword) {
                require("machinepack-gravatar").getImageUrl({
                    emailAddress: req.param("email")
                }).switch({
                    error: function(err) {
                        return res.negotiate(err);
                    },
                    success: function(gravatarUrl) {
                        User.create({
                            name: req.param("name"),
                            email: req.param("email"),
                            password: encryptedPassword,
                            lastLoggedIn: new Date(),
                            gravatarUrl: gravatarUrl
                        }, function userCreated(err, newUser) {
                            if(err) {
                                console.log("ERROR: " + err);
                                res.negotiate(err);
                            }

                            //SESSIPN variable

                            console.log("User Added!");

                            return res.json({
                                id: newUser.id
                            });
                        });
                    }
                });
            }
        });
    },
    login: function(req, res) {
        User.findOne({
            email: req.param("email")
        }, function userFound(err, user) {
            if(err) {
                return res.negotiiate(err);
            }
            if(!user) {
                return res.notFound();
            }

            require("machinepack-passwords").checkPassword({
                passwordAttempt: req.param("password"),
                encryptedPassword: user.password
            }).exec({
                error: function(err) {
                    return res.negotiate(err);
                },
                incorrect: function() {
                    res.notFound();
                },
                success: function() {
                    req.session.me = user.id;
                    return res.ok();
                }
            });
        });
    },
    getuser: function(req, res) {
        User.findOne({id: req.session.me}, function(err, user) {
            if(err) {
                return res.negotiate(err);
            }

            return res.send(user);
        });
    },
    logout: function(req, res) {
        User.findOne({id: req.session.me}, function(err, user) {
            if(err) {
                return res.negotiiate(err);
            }
            if(!user) {
                return res.notFound();
            }

            req.session.me = null;

            res.redirect("/");
        });
    }
};

