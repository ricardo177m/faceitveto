"use client";

import { createContext, useEffect, useState } from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";

import { Democracy } from "@/types/democracy";
import { faceitConfig } from "@/config/faceit";
import { outgoing } from "@/lib/edgeEvents";
import { parseEvent } from "@/lib/edgeParser";
import { eventEmitter } from "@/lib/eventEmitter";

export interface EdgeContextData {
  sendMessage: SendMessage;
  subscribeDemocracy: (
    matchId: string,
    callback: (payload: Democracy) => void
  ) => void;
  unsubscribeDemocracy: (
    matchId: string,
    callback: (payload: Democracy) => void
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
  const { sendMessage, readyState } = useWebSocket(faceitConfig.edge, {
    onMessage: handleMessage,
  });

  const [version, setVersion] = useState<string | null>(null);

  async function handleMessage(event: MessageEvent) {
    const data = event.data as Blob;
    const e = parseEvent(Buffer.from(await data.arrayBuffer()));

    if (e === null) return console.log("[Edge] Unknown event");

    console.log("[Edge] Received event: " + e.event);

    switch (e.event) {
      case "welcome":
        console.log(`[Edge] Welcome accepted, version ${e.payload}`);
        setVersion(e.payload);
        break;
      case "ping":
        sendMessage(outgoing.pong);
        break;
      case "voting_update":
        eventEmitter.emit("democracy", e.payload.entity);
        break;
    }
  }

  function subscribeDemocracy(
    matchId: string,
    callback: (payload: Democracy) => void
  ) {
    sendMessage(outgoing.subscriptions.democracy(matchId));
    eventEmitter.on("democracy", callback);
  }

  function unsubscribeDemocracy(
    matchId: string,
    callback: (payload: Democracy) => void
  ) {
    eventEmitter.off("democracy", callback);
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
        unsubscribeDemocracy,
        version,
      }}
      {...props}
    >
      {children}
    </EdgeContext.Provider>
  );
}

export default EdgeContext;
