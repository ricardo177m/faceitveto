const COOKIE_PREFIX = "FACEITVETO";

export const config = {
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

  lastNumberOfMatches: 100,

  cookies: {
    token: `${COOKIE_PREFIX}:token`,
  },
  localStorage: {
    code_verifier: `${COOKIE_PREFIX}:code_verifier`,
  },
};
