// src/app/dashboard/page.tsx — FINAL: Chips scrollable inside container
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { LogOut, Settings } from 'lucide-react';

type Tab = 'roster' | 'events' | 'chat' | 'stats' | 'highlights' | 'playbook';
type RosterTab = 'coach' | 'athlete' | 'supporter';

interface Player {
  id: string;
  name: string;
  number?: string;
  role: 'coach' | 'athlete' | 'supporter';
  photoURL?: string;
}

export default function CoachDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('roster');
  const [rosterTab, setRosterTab] = useState<RosterTab>('athlete');
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!auth.currentUser) router.replace('/login');
  }, [router]);

  useEffect(() => {
    const q = collection(db, 'teams', 'wolves', 'members');
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Player));
      setPlayers(data);
    });
    return unsub;
  }, []);

  const filteredPlayers = players.filter(p => {
    if (rosterTab === 'coach') return p.role === 'coach';
    if (rosterTab === 'supporter') return p.role === 'supporter';
    return p.role === 'athlete';
  });

  if (!auth.currentUser) return null;

  const chips = [
    { id: 'roster', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { id: 'chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { id: 'stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'highlights', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { id: 'playbook', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/white-honeycomb.png')" }}>
      <div className="min-h-screen bg-black/70 backdrop-blur-sm flex flex-col">

        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/20 px-6 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-black text-orange-500">STATFYR</h1>
          <div className="flex gap-6">
            <button className="p-3 hover:bg-white/10 rounded-xl"><Settings className="w-7 h-7 text-gray-300" /></button>
            <button onClick={() => auth.signOut().then(() => router.replace('/'))} className="p-3 hover:bg-white/10 rounded-xl"><LogOut className="w-7 h-7 text-gray-300" /></button>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="mx-6 mt-8">
          <div className="bg-black/60 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 text-center shadow-2xl">
            <h2 className="text-4xl marker-font text-white">Thunder Wolves</h2>
            <p className="text-lg text-gray-300 mt-2">Basketball • 2025 Season</p>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-6 pb-32">
          <div className="bg-gradient-to-b from-blue-900/30 to-transparent backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl">
            {activeTab === 'roster' ? (
              <>
                {/* Role Tabs */}
                <div className="flex justify-center gap-4 mb-6">
                  <button onClick={() => setRosterTab('coach')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${rosterTab === 'coach' ? 'bg-orange-600' : 'bg-gray-800/90'}`}>
                    Coach/Staff
                  </button>
                  <button onClick={() => setRosterTab('athlete')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${rosterTab === 'athlete' ? 'bg-orange-600' : 'bg-gray-800/90'}`}>
                    Athletes
                  </button>
                  <button onClick={() => setRosterTab('supporter')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${rosterTab === 'supporter' ? 'bg-orange-600' : 'bg-gray-800/90'}`}>
                    Supporters
                  </button>
                </div>

                {/* Roster Cards */}
                <div className="space-y-4">
                  {filteredPlayers.map((player) => (
                    <div key={player.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 flex items-center shadow-xl">
                      <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 mr-4">
                        <img src={player.photoURL || '/default-avatar.png'} alt={player.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl marker-font text-white">{player.name}</h3>
                        {player.number && <p className="text-3xl font-black text-orange-500">#{player.number}</p>}
                        <p className="text-sm text-gray-400 uppercase">{player.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredPlayers.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-2xl text-gray-400">No {rosterTab}s yet</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 text-gray-400">
                {activeTab} coming soon
              </div>
            )}
          </div>
        </main>

        {/* Bottom Chip Row — SCROLLABLE INSIDE CONTAINER */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="mx-6 mb-8">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-full p-4 shadow-2xl">
              <div className="flex gap-8 overflow-x-auto px-4 scrollbar-hide">
                {chips.map((chip) => (
                  <button key={chip.id} onClick={() => setActiveTab(chip.id as Tab)} className="transition-transform hover:scale-110 flex-shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20 ${activeTab === chip.id ? 'bg-orange-600' : 'bg-gray-800/90'}`}>
                      <svg className={`w-8 h-8 ${activeTab === chip.id ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={chip.icon} />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}