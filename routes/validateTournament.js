module.exports = function (tourname) {
  let obj = {};
  obj.accepted = false;
  obj.msg = "";

  let a = /^[0-9A-Za-z\s-]+$/.test(tourname);
  let lessThanTwoWhitespace = !/\s{2,}/.test(tourname);
  let isProperLength = tourname.length > 4 && tourname.length <= 30;

  if (!a)
    obj.msg +=
      "Tournament name must be made up of letters, digits, spaces and dashes\n";
  if (!lessThanTwoWhitespace)
    obj.msg += "Tournament name cannot have 2 consecutive white spaces\n";
  if (!isProperLength)
    obj.msg += "Tournament name must be between 5 and 30 characters\n";

  obj.accepted = a && lessThanTwoWhitespace && isProperLength;
  return obj;
};
