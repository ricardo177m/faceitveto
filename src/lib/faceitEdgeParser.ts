import { incoming } from "./faceitEdgeEvents";

function checkEvent(eventType: FaceitEdgeEventType, msg: Buffer) {
  // <left_bytes> + <event> + <right_bytes> + <json_payload>
  const bytesLeft = eventType.padding.l;
  const bytesRight = eventType.padding.r;
  const eventTypeLength = Buffer.from(eventType.pattern, "utf8").length;

  const event = msg.subarray(bytesLeft, bytesLeft + eventTypeLength);
  const payload = msg.subarray(bytesLeft + eventTypeLength + bytesRight);

  const presumedEvent = Buffer.from(eventType.pattern, "utf8");

  // compare presumed event with incoming event
  if (!presumedEvent.equals(event)) return null;
  if (eventType.jsondata === false) return payload.toString("utf8");
  return JSON.parse(payload.toString("utf8"));
}

export function parseEvent(message: Buffer) {
  // TODO: use protobufs instead of this rudimentary parser
  for (const eventType of incoming) {
    const payload = checkEvent(eventType, message);
    if (payload !== null) {
      return {
        event: eventType.name,
        payload: payload,
      };
    }
  }
  return {
    event: "unknown",
    payload: message,
  };
}
