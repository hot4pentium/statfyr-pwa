import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-black text-orange-500 mb-6">STATFYR</h1>
      <p className="text-xl text-gray-400 mb-12">The Coach & Team Hub</p>
      <div className="space-y-6 w-full max-w-sm">
        <Link href="/login" className="block w-full py-6 bg-orange-600 hover:bg-orange-500 rounded-3xl text-2xl font-bold transition-all hover:scale-105 shadow-2xl">
          Coach Login / Sign Up
        </Link>
        <Link href="/roster/invite/demo123" className="block w-full py-6 bg-blue-600 hover:bg-blue-500 rounded-3xl text-2xl font-bold transition-all hover:scale-105 shadow-2xl">
          Player – Join with Invite Code
        </Link>
      </div>
    </div>
  );
}