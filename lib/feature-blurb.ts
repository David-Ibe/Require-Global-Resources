/**
 * Short benefit line for each bullet on product pages (replaces one generic paragraph).
 */
export function featureBlurbFor(feature: string): string {
  const t = feature.toLowerCase();

  if (t.includes("360") || t.includes("rotation"))
    return "Set the angle you need for maps and calls — without blocking your view of the road.";
  if (t.includes("universal") || t.includes("all phones"))
    return "Works with your phone and case today — no guessing if it will fit.";
  if (t.includes("air vent") || t.includes("30 second"))
    return "Clips in fast and stays put — no glue, no permanent mounts.";
  if (t.includes("magnet") || t.includes("strong"))
    return "Holds firm over rough roads so your phone is not bouncing into the footwell.";
  if (t.includes("one-hand") || t.includes("mount and release"))
    return "Pick up and dock with one hand when traffic allows — less fumbling.";

  if (t.includes("all car models") || t.includes("universally"))
    return "Designed to slot into the gap beside most seats and consoles.";
  if (t.includes("cup holder"))
    return "Keep a drink or small bottle within reach — fewer spills in the cabin.";
  if (t.includes("2 minute") || t.includes("install"))
    return "No tools marathon — slide it in and you are done.";
  if (t.includes("stop") && (t.includes("phone") || t.includes("key") || t.includes("coin")))
    return "Ends the drop-between-the-seats routine that wastes time at every stop.";
  if (t.includes("leather") || t.includes("finish"))
    return "Looks at home in your interior — not cheap plastic that peels in weeks.";

  if (t.includes("bundle") || t.includes("2 premium") || t.includes("in 1 order"))
    return "One checkout for both items — one delivery, one tracking conversation.";
  if (t.includes("phone holder") && t.includes("included"))
    return "Hands-free navigation and calls sorted — the holder is in the box.";
  if (t.includes("gap organiser") && t.includes("included"))
    return "Catch coins and keys before they fall — the organiser is in the box.";
  if (t.includes("free delivery") && t.includes("bundle"))
    return "Delivery cost is on us for this bundle — better value door to door.";
  if (t.includes("save") && t.includes("₦"))
    return "You pay less than buying each piece on its own — see the package price.";

  if (t.includes("delivery") || t.includes("nigeria"))
    return "Shipped from our Lagos hub — typical arrival in a few days, state depending.";
  if (t.includes("pay on delivery") || t.includes("cod"))
    return "Inspect at the door before you pay — the way serious buyers prefer it.";
  if (t.includes("cac") || t.includes("registered"))
    return "You are buying from a traceable Nigerian business — not a random handle.";
  if (t.includes("whatsapp") || t.includes("support"))
    return "Questions go to a real person — not a bot loop that vanishes after payment.";

  return "Included so you get real utility from day one — not a throwaway gimmick.";
}
