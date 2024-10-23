export interface Democracy {
  match_id: string;
  voters: {
    faction1: string[];
    faction2: string[];
  };
  conditions?: {
    turn_to_vote: "faction1" | "faction2";
    ticket: number;
    round: number;
    action: "drop" | "pick";
    time_left_to_vote: number; // ms to vote
  };
  tickets: Ticket[];
  vote_complete?: boolean;
}

export interface Ticket {
  entities: Entity[];
  entity_type: "location" | "map";
  vote_type?: string;
  config?: Config[];
  timeout?: number;
}

export interface Entity {
  status: "open" | "pick" | "drop";
  selected_by: "faction1" | "faction2" | "n/a";
  properties: {
    image_sm: string;
    image_lg: string;
    name: string;
    guid: string;
    class_name: string;
    game_location_id?: string;
    game_map_id?: string;
  };
}

interface Config {
  voter: "faction1" | "faction2";
  action: "drop" | "pick";
}
