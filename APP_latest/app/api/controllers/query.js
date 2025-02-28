const eventModel = require('../models/Events');
const userModel = require('../models/users');

module.exports = {
    EventByTag: function (req, res, next) {
        const reqTag = new RegExp(req.params.tag);
        eventModel.find({
            Tags: reqTag
        }, function (err, events) {
            let queryList = [];
            if (err) {
                {
                    res.json({
                        eror: err
                    })
                }
            } else {
                for (let event of events) {
                    queryList.push({
                        id: event._id,
                        Tittle: event.Tittle,
                        created_on: event.created_on,
                        Description: event.Description,
                        Eventlocation: event.Eventlocation,
                        category: event.category,
                        tags: event.Tags,
                        UserProfileID: event.UserProfileID
                    });
                }
                res.json({

                    status: "success",
                    message: "Events found!!!",
                    data: {
                        event: queryList

                    }
                });
            }
        });
    },
    EventByLocation: function (req, res, next) {
        const reqTag = new RegExp(req.params.tag);
        eventModel.find({
            Eventlocation: reqTag
        }, function (err, events) {
            let queryList = [];
            if (err) {
                {
                    res.json({
                        eror: err
                    })
                }
            } else {
                for (let event of events) {
                    queryList.push({
                        id: event._id,
                        Tittle: event.Tittle,
                        created_on: event.created_on,
                        Description: event.Description,
                        Eventlocation: event.Eventlocation,
                        category: event.category,
                        tags: event.Tags,
                        UserProfileID: event.UserProfileID
                    });
                }
                res.json({

                    status: "success",
                    message: "Events found!!!",
                    data: {
                        event: queryList

                    }
                });
            }
        });
    },
    EventByCategory: function (req, res, next) {
        const reqTag = new RegExp(req.params.tag);
        eventModel.find({
            category: reqTag
        }, function (err, events) {
            let queryList = [];
            if (err) {
                next(err);
            } else {
                for (let event of events) {
                    queryList.push({
                        id: event._id,
                        Tittle: event.Tittle,
                        created_on: event.created_on,
                        Description: event.Description,
                        Eventlocation: event.Eventlocation,
                        category: event.category,
                        tags: event.Tags,
                        UserProfileID: event.UserProfileID
                    });
                }
                res.json({

                    status: "success",
                    message: "Events found!!!",
                    data: {
                        event: queryList

                    }
                });
            }
        });
    }
}