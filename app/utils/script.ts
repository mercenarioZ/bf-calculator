export function convertStringToArray(str: string) {
  const array = str
    .split(/(?:\d+\.|,\d+\.)\s*/)
    .filter(Boolean)
    .map((item) => item.trim());

  const filteredArray = array.map((item) => {
    // const isMultipleNumbers = /,\d+\./.test(str);

    const cleanName = item.replace(/\d+/g, "").trim();

    // if (isMultipleNumbers) {
    //   cleanName = '*' + cleanName;  // add the "*" character
    // }
    return cleanName;
  });

  return filteredArray;
}
