"use client";

import { createContext, useEffect, useState } from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";

import { faceit } from "@/config/endpoints";
import { eventEmitter } from "@/lib/eventEmitter";
import { outgoing } from "@/lib/faceitEdgeEvents";
import { parseEvent } from "@/lib/faceitEdgeParser";

interface FaceitEdgeContextData {
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

interface FaceitEdgeContextProviderProps {
  children: React.ReactNode;
}

const FaceitEdgeContext = createContext<FaceitEdgeContextData>(
  {} as FaceitEdgeContextData
);

export function FaceitEdgeContextProvider({
  children,
  ...props
}: FaceitEdgeContextProviderProps) {
  const { sendMessage } = useWebSocket(faceit.edge, {
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
    <FaceitEdgeContext.Provider
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
    </FaceitEdgeContext.Provider>
  );
}

export default FaceitEdgeContext;
