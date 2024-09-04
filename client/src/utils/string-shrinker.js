function shortenString(str, maxLen) {
  if (str.length <= maxLen) {
    return str;
  } else {
    return str.slice(0, maxLen - 1) + "...";
  }
}

export default shortenString;