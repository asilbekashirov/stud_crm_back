const fs = require("fs");

const checkFolders = () => {
  if (fs.existsSync("./media")) return;

  fs.mkdirSync("./media");

  const folders = ["users", "university"];

  folders.forEach((name) => {
    if (!fs.existsSync(`./media/${name}`)) {
      fs.mkdirSync(`./media/${name}`);
    }
  });
};

const createFolder = (name) => {
  if (fs.existsSync(`./media/users/${name}`)) return;

  fs.mkdirSync(`./media/users/${name}`);
};

module.exports = { checkFolders, createFolder };
