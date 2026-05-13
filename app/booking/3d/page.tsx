'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { resorts } from '@/data/resorts';
import { roomsForResort, Room } from '@/data/rooms';
import { inr } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { X, Maximize2, Info } from 'lucide-react';

const ResortScene3D = dynamic(() => import('@/components/three/ResortScene3D'), { ssr: false, loading: () => (
  <div className="absolute inset-0 grid place-items-center text-bone/50 text-sm tracking-widest uppercase">Loading 3D experience…</div>
) });

export default function Booking3DPage() {
  const [resortIdx, setResortIdx] = useState(0);
  const resort = resorts[resortIdx];
  const allRooms = useMemo(() => roomsForResort(resort.slug), [resort.slug]);
  const [selected, setSelected] = useState<Room | null>(null);
  const [showLegend, setShowLegend] = useState(false);

  const checkIn = '2026-06-12';
  const checkOut = '2026-06-15';
  const nights = 3;

  return (
    <div className="relative min-h-[100svh] bg-ink pt-20">
      {/* HUD top */}
      <div className="absolute top-20 inset-x-0 z-30 px-4 md:px-8 pt-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="glass px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {resorts.map((r, i) => (
            <button key={r.slug} onClick={() => { setResortIdx(i); setSelected(null); }}
              className={`shrink-0 px-3 py-2 text-[10px] tracking-[0.2em] uppercase transition ${i === resortIdx ? 'bg-gold text-ink' : 'text-bone/70 hover:text-gold'}`}>
              {r.location.split(',')[0]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowLegend((s) => !s)} className="glass px-3 py-2 text-bone text-[11px] tracking-widest uppercase flex items-center gap-2">
            <Info size={14} /> Legend
          </button>
          <Link href="/booking" className="glass px-3 py-2 text-gold text-[11px] tracking-widest uppercase">Standard view</Link>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="absolute top-44 md:top-32 right-4 md:right-8 z-30 glass p-4 w-64">
          <p className="kicker mb-3 text-gold">Room status</p>
          {[
            ['available', 'Available'],
            ['selected', 'Selected'],
            ['booked', 'Booked'],
            ['maintenance', 'Maintenance'],
          ].map(([k, l]) => (
            <div key={k} className="flex items-center gap-3 py-1.5 text-xs text-bone/80">
              <span className="w-3 h-3 rounded-full" style={{ background: { available: '#3fbf6f', selected: '#e6c878', booked: '#c43d3d', maintenance: '#7a7a7a' }[k as string] }} />
              {l}
            </div>
          ))}
          <p className="mt-3 text-[10px] text-bone/40 leading-relaxed">Drag to orbit · pinch / scroll to zoom · tap a building to select.</p>
        </div>
      )}

      {/* 3D canvas */}
      <div className="relative h-[calc(100svh-5rem)]">
        <ResortScene3D rooms={allRooms} selectedId={selected?.id ?? null} onSelect={(r) => setSelected(r)} />

        {/* resort label */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 max-w-xs pointer-events-none">
          <p className="kicker text-gold mb-2">Now exploring</p>
          <p className="font-display text-3xl md:text-5xl text-bone leading-[1]">{resort.name}</p>
          <p className="font-display italic text-bone/60 mt-1">{resort.tagline}</p>
        </div>
      </div>

      {/* Selection panel — bottom sheet on mobile, side card on desktop */}
      {selected && (
        <div className="fixed inset-x-0 bottom-0 md:inset-y-20 md:right-0 md:left-auto md:bottom-0 z-40 md:w-[420px]">
          <div className="glass border-t md:border-t-0 md:border-l border-gold/30 h-full md:h-auto md:my-auto md:mr-4 md:rounded p-5 md:p-6 max-h-[80svh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="kicker text-gold mb-2">{selected.type}</p>
                <p className="font-display text-3xl text-bone">{selected.name}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-bone/60 hover:text-gold p-1"><X size={20} /></button>
            </div>
            <div className="relative aspect-[16/10] mb-4 overflow-hidden">
              <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="420px" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="border-l border-gold/40 pl-3">
                <p className="text-bone/40 uppercase tracking-widest text-[9px]">Capacity</p>
                <p className="text-bone">{selected.capacity} guests</p>
              </div>
              <div className="border-l border-gold/40 pl-3">
                <p className="text-bone/40 uppercase tracking-widest text-[9px]">Per night</p>
                <p className="text-gold">{inr(selected.pricePerNight)}</p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-2 mb-5">
              {selected.features.map((f) => (
                <li key={f} className="text-[11px] text-bone/60 border border-bone/10 px-2 py-1.5">{f}</li>
              ))}
            </ul>
            <div className="border-t border-gold/20 pt-4 mb-4 text-sm">
              <div className="flex justify-between text-bone/70 mb-1"><span>Check-in</span><span>{checkIn}</span></div>
              <div className="flex justify-between text-bone/70 mb-1"><span>Check-out</span><span>{checkOut}</span></div>
              <div className="flex justify-between text-bone mt-3 pt-3 border-t border-bone/10"><span className="text-bone/70">Total · {nights} nights</span><span className="text-gold font-display text-xl">{inr(selected.pricePerNight * nights)}</span></div>
            </div>
            <Link href={`/booking?resort=${resort.slug}&room=${selected.id}`} className="block w-full text-center px-5 py-4 bg-gold text-ink text-[11px] tracking-[0.25em] uppercase hover:bg-bone transition">
              Continue booking
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
