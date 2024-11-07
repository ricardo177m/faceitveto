export const incoming: FaceitEdgeEventType[] = [
  {
    name: "welcome",
    pattern: "FACEIT Edge <prod>",
    jsondata: false,
    padding: { l: 9, r: 1 },
  },
  { name: "ping", pattern: "", jsondata: false, padding: { l: 0, r: 0 } },
  {
    name: "pubsub_confirmation",
    pattern: "pubsub",
    jsondata: false,
    padding: { l: 14, r: 0 },
  },
  {
    name: "lobby_player_joined",
    pattern: "lobby_player_joined",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "lobby_player_left",
    pattern: "lobby_player_left",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "lobby_created",
    pattern: "lobby_created",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "lobby_destroyed",
    pattern: "lobby_destroyed",
    jsondata: true,
    padding: { l: 9, r: 2 },
  },
  {
    name: "lobby_updated",
    pattern: "lobby_updated",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "voting_update",
    pattern: "voting_update",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "match_update",
    pattern: "match_update",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "match_state_update",
    pattern: "match_state_update",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "match_results_update",
    pattern: "match_results_update",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
  {
    name: "match_partial_results",
    pattern: "match_partial_results",
    jsondata: true,
    padding: { l: 12, r: 3 },
  },
];

export const outgoing = {
  welcomeAnonymous: Buffer.from(
    "CPjKxAISFgoJMC4wLjAtZGV2Eglhbm9ueW1vdXM=",
    "base64"
  ),
  welcomeToken: (token: string) =>
    Buffer.concat([
      Buffer.from("CPjKxAISOAoJMC4wLjAtZGV2Eis=", "base64"),
      Buffer.from("Bearer " + token, "utf-8"),
    ]),
  pong: Buffer.from("CAASAhgC", "base64"),
  subscriptions: {
    public: Buffer.from("CAASGAgBGAMiEgoGcHVic3ViEggKBnB1YmxpYw==", "base64"),
    clan: (id: string) =>
      Buffer.concat([
        Buffer.from("CAASOwgFGAMiNQoGcHVic3ViEisK", "base64"),
        Buffer.from(")hubs-" + id),
      ]),
    user: (id: string) =>
      Buffer.concat([
        Buffer.from(
          "CAASQwgCGAMiPQoGcHVic3ViEjMKMXByaXZhdGUtdXNlci0=",
          "base64"
        ),
        Buffer.from(id),
      ]),
    lobby: Buffer.from("", "base64"),
    match: (id: string) =>
      Buffer.concat([
        Buffer.from("CAASPQgCGAMiNwoGcHVic3ViEi0KK3Jvb21f", "base64"),
        Buffer.from(id),
      ]),
    democracy: (id: string) =>
      Buffer.concat([
        Buffer.from("CAASQggmGAMiPAoGcHVic3ViEjIKMGRlbW9jcmFjeS0=", "base64"),
        Buffer.from(id),
      ]),
  },
};
