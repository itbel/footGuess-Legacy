module.exports = function (user, pass) {
  let obj = {};
  obj.msg = "";
  obj.accepted = false;
  let userisRequiredLength = user.length >= 4 && user.length <= 20;
  let userhasNoWhitespace = !/\s/.test(user);
  let userhasNoSymbols = !/[!@#~$%^&*()_+=[{\]};:<>\\|.`/?,-]/.test(user);
  let userisAlphanumeric = /^[a-zA-Z0-9]+$/.test(user);

  let passisRequiredLength = pass.length >= 4 && pass.length <= 20;
  let passhasNoWhitespace = !/\s/.test(pass);
  if (!userisRequiredLength)
    obj.msg += "Username must be between 4 and 20 characters\n";
  if (!userhasNoWhitespace) obj.msg += "Username must contain no spaces\n";
  if (!userhasNoSymbols) obj.msg += "Username must not contain symbols\n";
  if (!userisAlphanumeric)
    obj.msg += "Username must only contain letters and numbers\n";

  if (!passisRequiredLength)
    obj.msg += "Password must be at between 4 and 20 characters\n";
  if (!passhasNoWhitespace)
    obj.msg += "Password must not contain whitespaces\n";
  obj.accepted =
    userhasNoSymbols &&
    userhasNoWhitespace &&
    userisAlphanumeric &&
    userisRequiredLength &&
    passisRequiredLength &&
    passhasNoWhitespace;
  return obj;
};
