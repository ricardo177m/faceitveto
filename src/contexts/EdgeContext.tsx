"use client";

import { createContext, useEffect, useState } from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";

import { Democracy } from "@/types/democracy";
import { MatchState } from "@/types/match-state";
import { faceit } from "@/config/endpoints";
import { outgoing } from "@/lib/edgeEvents";
import { parseEvent } from "@/lib/edgeParser";
import { eventEmitter } from "@/lib/eventEmitter";

export interface EdgeContextData {
  sendMessage: SendMessage;
  subscribeDemocracy: (
    matchId: string,
    callback: (payload: Democracy) => void
  ) => void;
  subscribeMatchState: (
    matchId: string,
    callback: (payload: MatchState) => void
  ) => void;
  unsubscribeDemocracy: (
    matchId: string,
    callback: (payload: Democracy) => void
  ) => void;
  unsubscribeMatchState: (
    matchId: string,
    callback: (payload: MatchState) => void
  ) => void;
  version: string | null;
}

interface EdgeContextProviderProps {
  children: React.ReactNode;
}

const EdgeContext = createContext<EdgeContextData>({} as EdgeContextData);

export function EdgeContextProvider({
  children,
  ...props
}: EdgeContextProviderProps) {
  const { sendMessage, readyState } = useWebSocket(faceit.edge, {
    onMessage: handleMessage,
  });

  const [version, setVersion] = useState<string | null>(null);

  async function handleMessage(event: MessageEvent) {
    const data = event.data as Blob;
    const e = parseEvent(Buffer.from(await data.arrayBuffer()));

    // if (e === null) return console.log("[Edge] Unknown event");
    // console.log("[Edge] Received event: " + e.event);

    switch (e.event) {
      case "welcome": {
        const version = (e.payload as string).slice(1, -1);
        setVersion(version);
        break;
      }
      case "ping": {
        sendMessage(outgoing.pong);
        break;
      }
      case "voting_update": {
        const d = e.payload.entity as Democracy;
        eventEmitter.emit("democracy-" + d.match_id, d);
        break;
      }
      case "match_state_update": {
        const m = e.payload.entity as MatchState;
        eventEmitter.emit("matchstate-" + m.id, m);
        break;
      }
    }
  }

  function subscribeDemocracy(
    matchId: string,
    callback: (payload: Democracy) => void
  ) {
    sendMessage(outgoing.subscriptions.democracy(matchId));
    eventEmitter.on("democracy-" + matchId, callback);
  }

  function unsubscribeDemocracy(
    matchId: string,
    callback: (payload: Democracy) => void
  ) {
    eventEmitter.off("democracy-" + matchId, callback);
  }

  function subscribeMatchState(
    matchId: string,
    callback: (payload: MatchState) => void
  ) {
    sendMessage(outgoing.subscriptions.match(matchId));
    eventEmitter.on("matchstate-" + matchId, callback);
  }

  function unsubscribeMatchState(
    matchId: string,
    callback: (payload: MatchState) => void
  ) {
    eventEmitter.off("matchstate-" + matchId, callback);
  }

  // const ready = readyState === ReadyState.OPEN;

  useEffect(() => {
    sendMessage(outgoing.welcomeAnonymous);
  }, []);

  return (
    <EdgeContext.Provider
      value={{
        sendMessage,
        subscribeDemocracy,
        subscribeMatchState: subscribeMatchState,
        unsubscribeDemocracy,
        unsubscribeMatchState: unsubscribeMatchState,
        version,
      }}
      {...props}
    >
      {children}
    </EdgeContext.Provider>
  );
}

export default EdgeContext;
