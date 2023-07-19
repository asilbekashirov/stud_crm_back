const multer = require("multer");
const uuid = require("uuid")

module.exports = function(folder) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `media/${folder}/`);
    },
    filename: function (req, file, cb) {
      const imageExtension = file?.originalname.split('.').at(-1)
      cb(null, uuid.v4() + `.${imageExtension}`); //Appending extension
    },
  });
}
