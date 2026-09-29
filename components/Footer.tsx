export default function Footer() {
  return (
    <div className="flex flex-wrap items-center justify-center text-xs animate-in fade-in duration-700">
      <p>
        © {new Date().getFullYear()} | Made with &lt;3 by Zechariah Frierson
      </p>
    </div>
  );
}
