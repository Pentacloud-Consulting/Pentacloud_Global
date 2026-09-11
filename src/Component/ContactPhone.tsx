"use client";

import React, { useState, useEffect } from "react";
import { getDomainConfig } from "@/Web-Page/Blogs/Dynamic Change Blog";

export default function ContactPhone() {
  const [phone, setPhone] = useState<string>("+971 545 132 807");

  useEffect(() => {
    setPhone(getDomainConfig().contactPhone);
  }, []);

  return <>{phone}</>;
}
