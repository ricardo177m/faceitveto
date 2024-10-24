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
