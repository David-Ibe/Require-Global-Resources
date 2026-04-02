"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroImage() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <Image
      src="/heroimagerequireglobal2.jpg"
      alt="Require Global Resources product showcase"
      fill
      className="object-cover"
      priority
      onError={() => setFailed(true)}
    />
  );
}
