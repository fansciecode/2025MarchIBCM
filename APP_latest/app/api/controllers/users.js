const userModel = require('../models/users');
const notify = require('../models/eventNotification');
const message = require('../models/Messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var firebase = require('firebase');
const EventModel = require('../models/Events');
var nodemailer = require('nodemailer');
var http = require('http');
var request = require("request");
const multer = require('multer');
const uploadImage = require('../controllers/helpers');

// function CreateChatfnc(payload){
//     var chatID 
//     notify.updateOne({
//         _id: noitiyId
//     }, {
//         $set: {
//             status: status,
//             MessageStatus: messagestatus
//         }
//     }, function (err, response) {
//         if (err) {
//             res.json({
//                 eror: err
//             })
//         } else {
//             firebase.database().ref('/NotificationsResponse').set({
//                 notificationId: noitiyId,
//                 Status: status,
//                 messageStatus: messagestatus
//             });
//             res.json({
//                 status: "success",
//                 message: "notification updated succefully",
//                 data: response
//             })
//         }


//     })

// }

function SendMail(Email, Otp) {


    var transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        auth: {
            user: 'admin@ibcm.app',
            pass: 'home@ibcm20'
        }
    });

    var mailOptions = {
        from: 'admin@ibcm.app',
        to: Email,
        subject: 'OTP :IBCM registartion',
        text: 'your One time passwrod for registration with IBCM:' + '' + Otp + ''
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return "mail sent Successfully";
};

function PhoneSms(PhonNumb, OTp) {

    var options = {
        method: 'GET',
        url: 'http://2factor.in/API/V1/17126fe5-47b6-11eb-8153-0200cd936042/SMS/' + '' + PhonNumb + '' + '/' + '' + OTp + '' + ' ',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {}
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

}
module.exports = {
    create: function (req, res, next) {
        function randNumb(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        var Email = req.body.email;
        var PhonNumber = req.body.mobileNumber;
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            dateofBirth: req.body.dateofBirth,
            OTP: randNumb(1000, 10000)
        }, function (err, result) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                var OneTP = result.OTP;
                SendMail(Email, OneTP);
                PhoneSms(PhonNumber, OneTP);
                res.json({
                    status: "success",
                    message: "User added successfully!!!",
                    data: result
                });
            }
        });
    },
    createProfile: function (req, res, next) {
        userModel.updateOne({
            _id: req.body.user_id
        }, {
            $set: {
                userProfile: {
                    about: req.body.userProfile.about,
                    socailprofilelink: req.body.userProfile.socailprofilelink,
                    location: req.body.userProfile.location,
                    eDuBackground: req.body.userProfile.eDuBackground,
                    workBackround: req.body.userProfile.workBackround,
                    imgUrl: req.body.userProfile.imgUrl,
                    interestsCat: req.body.userProfile.interestsCat,
                }
            }
        }, function (err, result) {
            if (err) {
                res.json({
                    eror: err
                })
            } else
                res.json({
                    status: "success",
                    message: "user profile updated successfully!!!",
                    data: result
                });
        });
    },
    publicProfile: function (req, res, next) {
        userModel.findById(req.body.user_id, function (err, response) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                res.json({
                    status: "success",
                    message: "User Profile available!!!",
                    data: {
                        name: response.name,
                        imgUrl: response.userProfile.imgUrl,
                        about: response.userProfile.about,
                        location: response.userProfile.location,
                        profession: response.userProfile.workBackround,
                        education: response.userProfile.eDuBackground,
                        socailprofilelink: response.userProfile.socailprofilelink,
                        InterestedCategories: response.userProfile.interestsCat,
                        EventsHosted: response.EventsHosted,
                        Eventsattened: response.EventsAttened
                    }
                });
            }

        });


    },
    JoinEvent: function (req, res, next) {
        var EventId = req.body.eventId;
        var FromdeviceId = req.body.fromdeviceId;
        var ToDeviceId = req.body.toDeviceId;
        var FromProfileId = req.body.fromProfileId;
        var ToProfileId = req.body.toProfileId;

        notify.create({
                eventId: EventId,
                fromdeviceId: FromdeviceId,
                toDeviceId: ToDeviceId,
                fromProfileId: FromProfileId,
                toProfileId: ToProfileId
            },
            function (err, response) {

                if (err) {
                    res.json({
                        eror: err
                    })
                } else {
                    EventModel.updateOne({
                        _id: EventId
                    }, {
                        $inc: {
                            JoinCount: 1
                        }
                    }, function (err, res) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(res)
                        }

                    });
                    userModel.updateOne({
                        _id: FromProfileId
                    }, {
                        $inc: {
                            EventsAttened: 1
                        }
                    }, function (err, res) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(res)
                        }

                    });
                    firebase.database().ref('/Notifications').set({
                        eventID: EventId,
                        fromProfileId: FromProfileId,
                        fromdeviceId: FromdeviceId,
                        toDeviceId: ToDeviceId,
                        toProfileId: ToProfileId
                    });
                    res.json({

                        status: "success",
                        message: "Join event request subbmitted !!",
                        data: response

                    })
                }

            })

    },
    userNotification:function(req,res,next){
        var userid = req.body.user_id;
        console.log(userid)
        var ResponseArray =[];
        notify.find({toProfileId:userid,Date:new Date()},function(err,response){

            for(let respon in response){
                ResponseArray.push=respon;
            }
            if(err){
                res.json({
                    error:err,
                    data:null
                });
            }else{
                
                res.json({
                    status:"success",
                    data:ResponseArray
                })
            }

        })

    },
    userChatlist:function(req,res,next){
        var userid = req.body.user_id;
        message.findOne({sender:userid},function(err,response){
            if(err){
                res.josn({
                    error:err
                })
            }else {
                res.json({
                    status:"success",
                    data:response
                })
            }
        })

    },
    notifcationReponse: function (req, res, next) {
        var noitiyId = req.body.notificationID;
        var status = req.body.status;
        var messagestatus = status ? 1 : 0;

        
        notify.updateOne({
            _id: noitiyId
        }, {
            $set: {
                status: status,
                MessageStatus: messagestatus
            }
        }, function (err, response) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
               notify.findById(noitiyId,function(err,notifyRes){
                if(err){
                    var notifDetails = err;
                    
                } else {
                    var notifDetails = notifyRes
                }
               })
                res.json({
                    status: "success",
                    message: "notification updated succefully",
                    notificationinfo : notifyRes,
                    data: response
                })
            }


        })

    },
    notificationInfo: function (req, res, next) {
        var notificationID = req.body.notifyId;

        notify.findById(notificationID, function (err, response) {

            if (err) {
                res.json({
                    eror: err
                })
            } else {
                res.json({
                    status: "success",
                    message: "found notification details",
                    data: response
                })
            }
        })
    },


   CreateChat :function (req, res, next) {
        var EventId = req.body.EventID;
        var senderId = req.body.senderID;
        var isGroupmessage = (req.body.isgroupMessage) ? 1 : 0;
        var participantsIds = req.body.participantIDs;

        message.create({
                eventID: EventId,
                sender: senderId,
                is_group_message: isGroupmessage,
                participants: participantsIds
            },
            function (err, response) {
                if (err) {
                    res.json({
                        eror: err
                    })
                } else {
                    firebase.database().ref('/createChat').set({
                        eventID: EventId,
                        sender: senderId,
                        is_group_message: isGroupmessage,
                        participants: {
                            user: participantsIds
                        }
                    });

                    res.json({
                        status: "success",
                        Message: "chat created successfully",
                        data: response

                    })
                }
            })


    },

    JoinChat: function (req, res, next) {
        var ChatID = req.body.ChatID;
        var UserID = req.body.userID;
        messages.update({
            _id: ChatID
        }, {
            $push: {
                participants: {
                    user: UserID
                }
            }
        }, function (err, response) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                res.json({
                    status: "success",
                    Message: "Joined Chat successfully",
                    data: response
                })
            }

        })
    },
    ChatMessage: function (req, res, next) {
        var chatID = req.body.ChatID;
        var EventID = req.body.eventId;
        var senderID = req.body.senderID;
        var touserID = req.body.toUserID;
        var messagedetails = req.body.message;

        message.update({
            _id: chatID
        }, {
            $push: {
                messages: {
                    message: messagedetails,
                    meta: {
                        user: senderID,
                        delivered: false
                    }
                }
            }
        }, function (err, response) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                firebase.database().ref('/chatMessages').set({
                    eventID: EventID,
                    ChatID: chatID,
                    sender: senderID,
                    messages: {
                        message: messagedetails,
                        user: touserID
                    }
                });

                res.json({
                    status: "success",
                    Message: "message Sent succefully",
                    data: response
                })
            }

        })


    },
    updatePassword: function (req, res, next) {
        userModel.updateOne({
            _id: req.body.user_id
        }, {
            $set: {
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }
        }, function (err, result) {
            if (err) {
                res.json({
                    eror: err
                })
            } else
                res.json({
                    status: "success",
                    message: "password updated successfully!!!",
                    data: result
                });

        });
    },
    authenticate: function (req, res, next) {
        userModel.find({
            email: req.body.email
        }, function (err, userInfo) {
            if (err) {
                {
                    res.json({
                        eror: err
                    })
                }
            } else {
                var result = bcrypt.compareSync(req.body.password, userInfo.passowrd);

                if (result) {
                    const token = jwt.sign({
                        id: userInfo._id
                    }, req.app.get('secretKey'), {
                        expiresIn: '1h'
                    });
                    res.json({
                        status: "success",
                        message: "user found!!!",
                        data: {
                            user: userInfo,
                            token: token
                        }
                    });
                } else {
                    res.json({
                        status: "error",
                        message: "Invalid email/password!!!"

                    });
                }
            }
        });
    },
    verifyOtp: function (req, res, next) {
        var userID = req.body.userID;
        var Otp = req.body.otp;
        userModel.findById(userID, function (err, respond) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                if (respond.OTP == Otp) {
                    userModel.updateOne({
                        _id: userID
                    }, {
                        $set: {
                            OTPStatus: true
                        }
                    }, function (err, resp) {
                        if (err) {
                            res.json({
                                eror: err
                            })
                        } else {
                            console.log(resp);
                        }
                    })
                    res.json({
                        status: "success",
                        Message: "OTP Verified succesfully",
                        data: null
                    })
                } else {
                    res.json({
                        status: "failed",
                        message: "Invalid OTP "
                    })
                }
            }

        })
    },

    uploadImage: async function (req, res, next) {
        try {
            const myFile = req.file
            const imageUrl = await uploadImage(myFile)
            res
                .status(200)
                .json({
                    message: "Upload was successful",
                    data: imageUrl
                })
        } catch (error) {
            next(error)
        }

    }
}