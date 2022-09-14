const fs = require("fs");
let read_team_file = () => {
  let file = "./data/teams.json";
  return fs.readFileSync(file);
};
exports.list = function () {
  return JSON.parse(read_team_file());
};
exports.getTeam = (arg, value) => {
  let result = JSON.parse(read_team_file());
  // all addresses are stored in a "result" object
  return result;
}
