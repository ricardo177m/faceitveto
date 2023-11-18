const COOKIE_PREFIX = "FACEITVETO";

export const config = {
  title: "FACEIT VETO",
  description:
    "Mind games start early on FACEIT, so a good map pick is always an advantage to the players.",

  lastNumberOfMatches: 100,

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

  maps: {
    de_ancient: "Ancient",
    de_anubis: "Anubis",
    de_cache: "Cache",
    de_cbble: "Cobblestone",
    de_dust2: "Dust 2",
    de_inferno: "Inferno",
    de_mirage: "Mirage",
    de_nuke: "Nuke",
    de_overpass: "Overpass",
    de_train: "Train",
    de_tuscan: "Tuscan",
    de_vertigo: "Vertigo",
  },

  cookies: {
    token: `${COOKIE_PREFIX}:token`,
  },
  localStorage: {
    code_verifier: `${COOKIE_PREFIX}:code_verifier`,
    newsPopup: `${COOKIE_PREFIX}:news-v1.0.1`,
  },
};
