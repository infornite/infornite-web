 export function toCamelCase(input: string, firstUpper: boolean = false): string {
    // remove all characters that should not be in a variable name
    // as well underscores an numbers from the beginning of the string
    var s = (input || '').replace(/([^a-zA-Z0-9_\- ])|([_\- :,.+]+$)|^[_\-0-9]+/g, "").trim().toLowerCase();
    // uppercase letters preceeded by a hyphen, underscore or a space
    s = s.replace(/([ -_]+)([a-zA-Z0-9])/g, function (a, b, c) {
      return c.toUpperCase();
    });
    // uppercase letters following numbers
    s = s.replace(/([0-9]+)([a-zA-Z])/g, function (a, b, c) {
      return b + c.toUpperCase();
    });

    if (firstUpper) {
      s = s.charAt(0).toUpperCase() + s.substring(1, s.length);
    }
    return s;
  };