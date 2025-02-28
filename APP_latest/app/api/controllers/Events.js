const eventModel = require('../models/Events');
const userModel = require('../models/users');
module.exports = {
    getById: function (req, res, next) {
        eventModel.findById(req.params.eventId, function (err, eventInfo) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                res.json({
                    status: "success",
                    message: "Event found!!!",
                    data: {
                        event: eventInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let eventsList = [];
        eventModel.find({}, function (err, events) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                for (let event of events) {
                    eventsList.push({
                        id: event._id,
                        Tittle: event.Tittle,
                        event_date: event.event_date,
                        Description: event.Description,
                        Eventlocation: event.Eventlocation,
                        locationCorodiantes: event.locationCorodiantes,
                        category: event.category,
                        tags: event.Tags,
                        UserProfileID: event.UserProfileID,
                        JoinCount: event.JoinCount
                    });
                }
                res.json({
                    status: "success",
                    message: "Events list found!!!",
                    data: {
                        events: eventsList
                    }
                });

            }
        });
    },
    updateById: function (req, res, next) {
        eventModel.findByIdAndUpdate(req.params.eventId, {
            Tittle: req.body.tittle
        }, function (err, eventInfo) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                res.json({
                    status: "success",
                    message: "Event updated successfully!!!",
                    data: null
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        eventModel.findByIdAndRemove(req.params.eventId, function (err, eventInfo) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                res.json({
                    status: "success",
                    message: "Event deleted successfully!!!",
                    data: null
                });
            }
        });
    },
    create: function (req, res, next) {
        var userID = req.body.UserProfileID;
        eventModel.create({
            tittle: req.body.tittle,
            imgUrl: req.body.imgUrl,
            contactInfo: req.body.contactInfo,
            event_date: req.body.event_date,
            eventTime: req.body.event_time,
            created_on: req.body.created_on,
            Description: req.body.Description,
            guideLines: req.body.guideLines,
            Eventlocation: req.body.Eventlocation,
            City: req.body.currentcity,
            locationCorodiantes: req.body.locationCorodiantes,
            event_category: req.body.event_category,
            Tags: req.body.Tags,
            UserProfileID: req.body.UserProfileID,
            aditionalImgOrVideo: req.body.aditionalImgOrVideo

        }, function (err, result) {
            if (err) {
                res.json({
                    eror: err
                })
            } else {

                userModel.updateOne({
                    _id: userID
                }, {
                    $inc: {
                        EventsHosted: 1
                    }
                }, function (err, res) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(res)
                    }

                });
                res.json({

                    status: "success",
                    message: "Event created successfully!!!",
                    data: result
                });

            }
        });
    },
}