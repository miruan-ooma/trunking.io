export function readCookie(name: string): string | undefined {
  const nameStr: string = name + "=",
    ca: Array<string> = document.cookie.split(";");

  for (let c of ca) {
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameStr) === 0) {
      return c.substring(nameStr.length, c.length);
    }
  }
  return undefined;
}
