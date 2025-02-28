const eventModel = require('../models/Events');
const locationModel = require('../models/location');
const geolib = require('geolib');
const UserModel = require('../models/users');
const EventCatModel = require('../models/categories');


module.exports = {
    getAll: function (req, res, next) {
        let eventsList = [];
        eventModel.find({}, function (err, events) {
            if (err) {
                {
                    res.json({
                        eror: err
                    })
                }
            } else {
                for (let event of events) {
                    eventsList.push({
                        id: event._id,
                        Tittle: event.Tittle,
                        created_on: event.created_on,
                        evenate_date: event.event_date,
                        Description: event.Description,
                        Eventlocation: event.Eventlocation,
                        category: event.category,
                        tags: event.Tags,
                        UserProfileID: event.UserProfileID,
                        Joincount: event.JoinCount
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

    getByLocation: function (req, res, next) {

        var Inlatitude = req.body.locationCorodiantes.latitude;
        var Inlongitude = req.body.locationCorodiantes.longitude;
        var radius = req.body.radius;
        var Requestdate =req.body.date;

        function georesult(Outlattitude, Outlongitude) {

            return geolib.isPointWithinRadius({
                    latitude: Inlatitude,
                    longitude: Inlongitude
                }, {
                    latitude: Outlattitude,
                    longitude: Outlongitude
                },
                radius
            );
        }

        function getdistance(Outlattitude, Outlongitude) {
            return geolib.getPreciseDistance({
                latitude: Inlatitude,
                longitude: Inlongitude
            }, {
                latitude: Outlattitude,
                longitude: Outlongitude
            }, 100);
        }
        eventModel.find({
            // event_date: req.body.date,
            City: req.body.city

        }, function (err, eventslist) {
            console.log(eventslist)
            
            let eventInradius = [];
            let queryList =[]
            if (err) {
                res.json({
                    eror: err
                })
            } else {
                for (events of eventslist){
                    if (events.event_date == "12/12/2020"){
                        queryList.push(event);
                    }
                }
                    console.log("events are",queryList);
                for (event of eventslist) {

                    if (georesult(event.locationCorodiantes.latitude, event.locationCorodiantes.longitude)) {
                        distance = getdistance(event.locationCorodiantes.latitude, event.locationCorodiantes.longitude);
                        event = {
                            "event": event,
                            "distance": distance,
                            "time": event.eventTime
                        };
                        eventInradius.push(event);

                    }
                }
                res.json({
                    // data: {
                    eventslist: eventInradius
                    // }
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
    }

}