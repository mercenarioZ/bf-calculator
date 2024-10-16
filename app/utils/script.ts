export function convertStringToArray(str: string) {
  const array = str
    .split(/(?:\d+\.|,\d+\.)\s*/)
    .filter(Boolean)
    .map((item) => item.trim());

  const filteredArray = array.map((item) => {
    const cleanName = item.replace(/\d+/g, "").trim();

    return cleanName;
  });

  return filteredArray;
}
