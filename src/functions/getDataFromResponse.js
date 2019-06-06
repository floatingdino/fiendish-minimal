// This function finds and prepares the inline "data" from a page and turns it into a JSON object. Very ugly and probably dangerous ¯\_(ツ)_/¯
export default function getDataFromResponse(resp) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(resp, "text/html");
  return JSON.parse(sanitiseJSON(doc.getElementById("data")));
}

export function sanitiseJSON(node) {
  const decoded = node.innerHTML
    .replace("var data =", "")
    .replace(/'/g, '"')
    .replace(/\\x/g, "%")
    .replace(/%26/g, "&")
    .replace(/,[ \r\n]*]/gs, "]")
    .replace(/,[ \r\n]*}/gs, "}")
    .replace(/\\?[\r\n]+/g, " ")
    .replace(/ +/g, " ");
  return decoded;
}
