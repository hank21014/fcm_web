import { $themeSwitch, $app } from "./dom";
import isSystemThemeDark from "./is-system-theme-dark";

export default () => {
  const themeKey = "theme";
  const darkKey = "dark";
  const lightKey = "light";

  const theme =
    localStorage.getItem(themeKey) ??
    (isSystemThemeDark() ? darkKey : lightKey);

  $app.setAttribute("data-theme", theme);

  if (theme === darkKey) {
    $themeSwitch.setAttribute("checked", true);
  }

  $themeSwitch.addEventListener("input", () => {
    const theme = $themeSwitch.checked ? darkKey : lightKey;
    $app.setAttribute("data-theme", theme);
    localStorage.setItem(themeKey, theme);
  });
};
