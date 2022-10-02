const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "djrbd6ftt",
    api_key: "275333218439728",
    api_secret: "sJu5ioDTHxkhyuJCenz6RgPa0pA",
});

module.exports = cloudinary;
