import "normalize.css";
import "../css/main.css";

import {
  $getTokenBtn,
  $configInput,
  $validKeyInput,
  $tokenInput,
  $copyTokenBtn,
} from "./dom";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import initFormControl from "./init-form-control";

import initTheme from "./init-theme";

(() => {
  initFormControl();
  initTheme();

  $copyTokenBtn.addEventListener("click", () =>
    navigator.clipboard.writeText($tokenInput.value)
  );

  $getTokenBtn.addEventListener("click", async () => {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Unable to get permission to notify.");
      return;
    }

    try {
      const config = JSON.parse($configInput.value);
      const firebaseApp = initializeApp(config);
      const messaging = getMessaging(firebaseApp);

      const token = await getToken(messaging, {
        vapidKey: $validKeyInput.value,
      });

      $tokenInput.value = token;

      onMessage(messaging, (payload) => {
        console.log("foreground: ", payload);
      });
    } catch (err) {
      alert(err);
    }
  });
})();
