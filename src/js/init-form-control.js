import { $configInput, $validKeyInput } from "./dom";

export default function () {
  const configKey = "fcm.config";
  const validKeyKey = "fcm.valid_key";

  const settingMap = [
    [$configInput, configKey],
    [$validKeyInput, validKeyKey],
  ];

  // init value
  settingMap.forEach(([el, key]) => (el.value = localStorage.getItem(key)));

  // init event listener, save value if changed
  settingMap.forEach(([el, key]) =>
    el.addEventListener("input", () => localStorage.setItem(key, el.value))
  );
}
