const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "visits.txt");

function ensureFileExists() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "0", "utf8");
  }
}

function getVisitorCount() {
  ensureFileExists();
  const count = fs.readFileSync(filePath, "utf8");
  return parseInt(count, 10) || 0;
}

function incrementVisitors() {
  const currentCount = getVisitorCount();
  fs.writeFileSync(filePath, String(currentCount + 1), "utf8");
}

module.exports = { incrementVisitors, getVisitorCount };