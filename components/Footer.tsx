import { useEffect, useState } from "react";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`flex flex-wrap items-center justify-center text-xs transition-opacity duration-900 ease-in ${
      isMounted ? "opacity-100" : "opacity-0"
    }`}>
        <p>
          © 2025 | Made with &lt;3 by Zechariah Frierson
        </p>
    </div>
  );
}