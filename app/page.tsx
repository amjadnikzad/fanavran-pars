import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center ">
        <h1 className="text-3xl ">
          خوش آمدید  
        </h1>
        <div className="flex items-baseline gap-4">
          <button className="p-0 rounded-sm bg-gray-400/30">
            <a className="py-2 px-4 inline-block" href="/login">Login</a></button>
          <button className="p-0 rounded-sm bg-gray-400/30"><a className="py-2 px-4 inline-block" href="/dashboard">Dashboard</a></button>
        </div>
      </main>
      
    </div>
  );
}
