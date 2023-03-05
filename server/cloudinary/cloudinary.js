const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')
const express=require('express')
const app=express()

exports.cloudinary = cloudinary.config({
    cloud_name: 'divscx3hc',
    api_key: '521783356674715',
    api_secret: 'EqkZ38Ju18PMZyIWoqSvdf-1yR8',
})
exports.file = app.use(fileUpload ({
    useTempFiles: true,
}))
