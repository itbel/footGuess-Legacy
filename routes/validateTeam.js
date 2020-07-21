module.exports = function (teamName) {
  let obj = {};
  obj.msg = "";
  obj.accepted = false;

  let teamisCharactersOrDash = /^[A-Za-z\s-]+$/.test(teamName);
  let teamisRequiredLength = teamName.length > 0 && teamName.length <= 30;
  let lessThanTwoWhitespace = !/\s{2,}/.test(teamName);
  let teamIsJustSpace = teamName === " ";

  if (!teamisCharactersOrDash)
    obj.msg +=
      "Team name must only be comprised of characters spaces and dashes\n";
  if (!teamisRequiredLength)
    obj.msg += "Team name must be between 1 and 30 characters\n";
  if (!lessThanTwoWhitespace)
    obj.msg += "Team name must not have consecutive spaces\n";
  if (teamIsJustSpace) obj.msg += "Team name must be more just one space\n";

  obj.accepted =
    teamisCharactersOrDash &&
    teamisRequiredLength &&
    lessThanTwoWhitespace &&
    !teamIsJustSpace;

  return obj;
};
