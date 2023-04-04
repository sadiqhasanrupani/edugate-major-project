const alphaNumGenerator = (string_len: number) => {
  let randomString = "";

  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < string_len; i++) {
    randomString += char.charAt(Math.floor(Math.random() * char.length));
  }

  return randomString;
};

export default alphaNumGenerator;