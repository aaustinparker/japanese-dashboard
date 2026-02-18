
import Dashboard from "@/components/Dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center overflow-x-clip bg-zinc-50 font-sans">
      <div>
        <main
          id="main-content"
          className="relative flex min-h-screen flex-col items-center overflow-hidden bg-white px-16 py-32"
        >
          <Image
            src="/wanikani.png"
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            className="pointer-events-none absolute left-6 top-6"
          />
          <Image
            src="/bunpro.png"
            alt=""
            aria-hidden="true"
            width={80}
            height={80}
            className="pointer-events-none absolute right-6 top-6"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none text-2xl font-semibold tracking-[0.35em] text-zinc-700/45"
          >
            日 本 語 学 習
          </div>

          <Dashboard />
        </main>
      </div>
    </div>
  );
}
