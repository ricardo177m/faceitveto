const COOKIE_PREFIX = "FACEITVETO";

export const config = {
  lastNumberOfMatches: 100,

  newsPopupText: null,

  cookies: {
    token: `${COOKIE_PREFIX}:token`,
  },
  localStorage: {
    newsPopup: `${COOKIE_PREFIX}:news-v2`,
    showMostRecent: `${COOKIE_PREFIX}:showMostRecent`,
  },

  prematch: {
    allowedUsers: [
      "8f0fdf8d-88c6-46b7-ac9d-aec92d7eb8da",
      "a0388b1e-2c05-4267-8c3c-69eb1ed0b52b", // crystal
      "7cec8c48-da2e-4b2d-ab28-a36e5d4528ab", // rysen
      "2ca96ee0-9722-4a22-88cd-edb73f3f2dec", // fanta
      "2b723fab-f1e5-4c9a-89ac-d13a2b6cea70", // nyzy
      "bcca18f1-558f-4aa3-b1ee-2b162fd2231c", // correia
      "582764e1-7b7e-493d-8142-7bbcfdd1769e", // kipo
      "04ef0c58-bce3-4fba-8260-912fd8b84313", // kokas
    ],
  },

  //*
  title: "FACEIT VETO",
  description:
    "Mind games start early on FACEIT, so a good map pick is always an advantage to the players.",
  premadeColors: [
    "#ff0000",
    "#13D9E9",
    "#00ff00",
    "#ff7f00",
    "#ffff00",
    "#ff00c7",
    "#83481f",
    "#c6ff83",
    "#9b00ff",
    "#ffffff",
  ],
  defaultAvatarAsset: "/assets/default-avatar.svg",
};
