'use client';
import { useState, useMemo, Suspense } from 'react';
import { resorts } from '@/data/resorts';
import { roomsForResort, Room } from '@/data/rooms';
import { inr } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Check, ArrowRight } from 'lucide-react';

function BookingInner() {
  const [resortSlug, setResortSlug] = useState(resorts[0].slug);
  const [checkIn, setCheckIn] = useState('2026-06-12');
  const [checkOut, setCheckOut] = useState('2026-06-15');
  const [guests, setGuests] = useState(2);
  const [selected, setSelected] = useState<Room | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const resort = resorts.find((r) => r.slug === resortSlug)!;
  const all = useMemo(() => roomsForResort(resortSlug), [resortSlug]);
  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));

  return (
    <div className="pt-28 md:pt-36 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-14">
          <p className="kicker mb-4 text-gold">Reserve a stay</p>
          <h1 className="h-display text-5xl md:text-7xl text-bone">Plan your <span className="italic gold-text">escape</span>.</h1>
          <p className="mt-4 text-bone/60 max-w-xl">A focused, three-step booking flow. Or, if you'd rather <Link href="/booking/3d" className="text-gold underline underline-offset-4">explore in 3D</Link>.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto no-scrollbar">
          {[
            { n: 1, l: 'Stay details' }, { n: 2, l: 'Choose a room' }, { n: 3, l: 'Confirm' },
          ].map((s) => (
            <div key={s.n} className={`flex items-center gap-2 px-3 py-2 border ${step >= s.n ? 'border-gold text-gold' : 'border-bone/15 text-bone/40'} text-[11px] tracking-widest uppercase`}>
              <span className="w-5 h-5 rounded-full grid place-items-center border border-current text-[10px]">{step > s.n ? <Check size={10} /> : s.n}</span>
              {s.l}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="glass p-6 md:p-10 grid md:grid-cols-2 gap-6">
            <div>
              <label className="kicker block mb-3">Resort</label>
              <div className="grid gap-2">
                {resorts.map((r) => (
                  <button key={r.slug} onClick={() => setResortSlug(r.slug)}
                    className={`flex items-center gap-4 p-3 border transition text-left ${resortSlug === r.slug ? 'border-gold bg-gold/5' : 'border-bone/10 hover:border-gold/40'}`}>
                    <div className="relative w-16 h-16 shrink-0 overflow-hidden">
                      <Image src={r.cover} alt={r.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <p className="font-display text-xl text-bone">{r.name}</p>
                      <p className="text-xs text-bone/50">{r.location}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-5 content-start">
              <div>
                <label className="kicker block mb-2">Check-in</label>
                <div className="flex items-center gap-3 bg-bone/5 border border-bone/10 px-4 py-3">
                  <Calendar size={16} className="text-gold" />
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent text-bone w-full outline-none [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="kicker block mb-2">Check-out</label>
                <div className="flex items-center gap-3 bg-bone/5 border border-bone/10 px-4 py-3">
                  <Calendar size={16} className="text-gold" />
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent text-bone w-full outline-none [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="kicker block mb-2">Guests</label>
                <div className="flex items-center justify-between bg-bone/5 border border-bone/10 px-4 py-3">
                  <div className="flex items-center gap-3 text-bone"><Users size={16} className="text-gold" /> {guests} {guests === 1 ? 'guest' : 'guests'}</div>
                  <div className="flex gap-2">
                    <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="w-8 h-8 border border-bone/20 text-bone hover:border-gold hover:text-gold">−</button>
                    <button onClick={() => setGuests((g) => Math.min(8, g + 1))} className="w-8 h-8 border border-bone/20 text-bone hover:border-gold hover:text-gold">+</button>
                  </div>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="mt-2 px-6 py-4 bg-gold text-ink text-[12px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 hover:bg-bone transition">
                Find rooms <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="font-display text-2xl text-bone">{all.length} rooms · {resort.name}</p>
              <button onClick={() => setStep(1)} className="text-xs tracking-widest uppercase text-bone/60 hover:text-gold">← Edit dates</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {all.map((room) => {
                const disabled = room.status === 'booked' || room.status === 'maintenance';
                const isSel = selected?.id === room.id;
                return (
                  <button key={room.id} disabled={disabled}
                    onClick={() => { setSelected(room); }}
                    className={`group text-left glass p-0 overflow-hidden border transition ${isSel ? 'border-gold ring-2 ring-gold/40' : 'border-gold/10 hover:border-gold/40'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px)100vw, 33vw" />
                      <div className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-widest uppercase bg-ink/70 backdrop-blur"
                        style={{ color: { available: '#3fbf6f', booked: '#c43d3d', selected: '#e6c878', maintenance: '#7a7a7a' }[room.status] }}>
                        {room.status}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="kicker text-gold/80 mb-1">{room.type}</p>
                      <p className="font-display text-xl text-bone">{room.name}</p>
                      <div className="flex justify-between items-end mt-3">
                        <span className="text-xs text-bone/50">{room.capacity} guests</span>
                        <span className="text-gold font-display text-xl">{inr(room.pricePerNight)}<span className="text-bone/50 text-xs"> / night</span></span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <button disabled={!selected} onClick={() => setStep(3)}
                className="px-6 py-4 bg-gold text-ink text-[12px] tracking-[0.25em] uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bone transition">
                Review reservation →
              </button>
            </div>
          </div>
        )}

        {step === 3 && selected && (
          <div className="grid lg:grid-cols-[1fr_440px] gap-8">
            <div className="glass p-6 md:p-10">
              <p className="kicker mb-4 text-gold">Guest details</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Full name', 'Email', 'Phone', 'Special requests'].map((f, i) => (
                  <div key={f} className={i === 3 ? 'sm:col-span-2' : ''}>
                    <label className="kicker block mb-2">{f}</label>
                    {i === 3
                      ? <textarea rows={3} className="w-full bg-bone/5 border border-bone/10 px-4 py-3 text-bone outline-none focus:border-gold" />
                      : <input className="w-full bg-bone/5 border border-bone/10 px-4 py-3 text-bone outline-none focus:border-gold" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass p-6 md:p-8 h-fit lg:sticky lg:top-28">
              <p className="kicker text-gold mb-4">Your stay</p>
              <p className="font-display text-2xl text-bone">{selected.name}</p>
              <p className="text-bone/60 text-sm">{resort.name}</p>
              <div className="hairline my-5" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-bone/70"><span>Check-in</span><span>{checkIn}</span></div>
                <div className="flex justify-between text-bone/70"><span>Check-out</span><span>{checkOut}</span></div>
                <div className="flex justify-between text-bone/70"><span>Guests</span><span>{guests}</span></div>
                <div className="flex justify-between text-bone/70"><span>{nights} × {inr(selected.pricePerNight)}</span><span>{inr(selected.pricePerNight * nights)}</span></div>
                <div className="flex justify-between text-bone/70"><span>Taxes & fees</span><span>{inr(Math.round(selected.pricePerNight * nights * 0.18))}</span></div>
              </div>
              <div className="hairline my-5" />
              <div className="flex justify-between items-end">
                <span className="kicker text-bone/60">Total</span>
                <span className="font-display text-3xl gold-text">{inr(Math.round(selected.pricePerNight * nights * 1.18))}</span>
              </div>
              <button className="mt-6 w-full px-5 py-4 bg-gold text-ink text-[12px] tracking-[0.25em] uppercase hover:bg-bone transition">Confirm reservation</button>
              <p className="mt-3 text-[10px] text-center text-bone/40">Demo flow — no payment is processed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return <Suspense fallback={null}><BookingInner /></Suspense>;
}
