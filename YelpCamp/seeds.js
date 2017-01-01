var mongoose = require('mongoose');

var CampGround = require('./models/capgrounds');
var Comment = require('./models/comments');


var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Granite Hill",
        image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://images.pexels.com/photos/27679/pexels-photo-27679.jpg?h=350&auto=compress",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

// Clear everything

// CALLBACK HELL

function seedDB() {
    // Remove camp grounds
    CampGround.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Cleared Camp Grounds...");

            // Now clear the comments
            Comment.remove({}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed comments...");

                    // Add in some camp grounds

                    data.forEach(function (seed) {
                        CampGround.create(seed, function (err, campground) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("Added a Camp Grounds...");
                                // create a comment
                                Comment.create({
                                    text: "Awesome place.. But very chilly!!",
                                    author: "Mini"
                                }, function (err, comment) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save(function (err, data) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log("created new comment");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
    // Add a few comments
}

module.exports = seedDB;
