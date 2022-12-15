// APIとの通信時、キャメルケースとスネークケースを変換したいときに使用
// 参考：https://www.yoheim.net/blog.php?q=20181204

// スネークケースからキャメルケースに変換（文字列）.
export function toCamelCase(str) {
  return str
    .split("_")
    .map(function (word, index) {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

// スネークケースからキャメルケースに変換（オブジェクト）.
export function toCamelCaseObject(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[toCamelCase(key)] = obj[key];
  });
  return result;
}

// キャメルケースからスネークケースに変換（文字列）.
export function toUnderscoreCase(str) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}

// キャメルケースからスネークケースに変換（オブジェクト）.
export function toUnderscoreCaseObject(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[toUnderscoreCase(key)] = obj[key];
  });
  return result;
}
