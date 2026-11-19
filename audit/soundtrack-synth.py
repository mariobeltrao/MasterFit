"""Original procedural track: light, upbeat melodic electronic, 116 BPM, A minor, ~28 s."""
import math, random, struct, wave, sys

SR = 44100
BPM = 116
BEAT = 60 / BPM
BAR = BEAT * 4
BARS = 13
TAIL = 1.6
N = int((BARS * BAR + TAIL) * SR)
L = [0.0] * N
R = [0.0] * N
random.seed(7)

def hz(m): return 440 * 2 ** ((m - 69) / 12)

# Am - F - C - G (MIDI)
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
ROOTS = [45, 41, 48, 43]

def add(buf, start, samples, gain=1.0):
    s = int(start * SR)
    for i, v in enumerate(samples):
        j = s + i
        if 0 <= j < N: buf[j] += v * gain

def both(start, samples, gain=1.0, pan=0.0):
    add(L, start, samples, gain * (1 - max(0, pan)))
    add(R, start, samples, gain * (1 + min(0, pan)))

def env_decay(n, tau):
    return [math.exp(-i / (tau * SR)) for i in range(n)]

def kick():
    n = int(0.32 * SR); out = []; ph = 0.0
    for i in range(n):
        t = i / SR
        f = 45 + 75 * math.exp(-t * 28)
        ph += 2 * math.pi * f / SR
        out.append(math.sin(ph) * math.exp(-t * 9))
    return out

def hat(dur=0.045):
    n = int(dur * SR); out = []; prev = 0.0
    for i in range(n):
        x = random.uniform(-1, 1); y = x - prev; prev = x
        out.append(y * math.exp(-i / (0.012 * SR)))
    return out

def clap():
    n = int(0.18 * SR); out = []; lp = 0.0
    for i in range(n):
        t = i / SR
        x = random.uniform(-1, 1); lp += 0.35 * (x - lp)
        bursts = sum(math.exp(-max(0, t - d) * 60) if t >= d else 0 for d in (0, 0.011, 0.022))
        out.append((x - lp) * min(1, bursts) * math.exp(-t * 14))
    return out

def tone(m, dur, harmonics, tau, attack=0.004, detune=0.0):
    n = int(dur * SR); f = hz(m) * (1 + detune); out = []
    for i in range(n):
        t = i / SR
        v = sum(a * math.sin(2 * math.pi * f * k * t) for k, a in harmonics)
        e = min(1, t / attack) * math.exp(-t / tau)
        out.append(v * e)
    return out

KICK, CLAP = kick(), clap()
HATS = [hat() for _ in range(4)]

def sidechain(t):
    """Gentle pump: duck right after each beat (only where the kick plays)."""
    bar = int(t / BAR)
    if bar < 1 or bar >= BARS - 1: return 1.0
    ph = (t % BEAT) / BEAT
    return 0.55 + 0.45 * min(1, ph / 0.45)

# --- Pad (continuous, detuned, soft) ---
for b in range(BARS):
    ch = CHORDS[b % 4]
    start = b * BAR
    dur = BAR + (TAIL + 0.4 if b == BARS - 1 else 0.05)
    n = int(dur * SR)
    s0 = int(start * SR)
    for i in range(n):
        j = s0 + i
        if j >= N: break
        t = i / SR
        att = min(1, t / 0.25)
        rel = 1.0 if t < BAR else math.exp(-(t - BAR) / (0.6 if b == BARS - 1 else 0.02))
        tt = j / SR
        vl = vr = 0.0
        for m in ch:
            f = hz(m + 12)
            for d, side in ((-0.004, 0), (0.004, 1)):
                v = math.sin(2 * math.pi * f * (1 + d) * tt) + 0.3 * math.sin(4 * math.pi * f * (1 + d) * tt) + 0.12 * math.sin(6 * math.pi * f * (1 + d) * tt)
                if side: vr += v
                else: vl += v
        g = 0.028 * att * rel * sidechain(tt)
        L[j] += vl * g; R[j] += vr * g

# --- Drums ---
for b in range(1, BARS - 1):
    for k in range(4):
        t = b * BAR + k * BEAT
        both(t, KICK, 0.55)
        if b >= 2: both(t + BEAT / 2, HATS[(b + k) % 4], 0.16, pan=0.3)
        if b >= 3 and k in (1, 3): both(t, CLAP, 0.22, pan=-0.1)
    if b >= 4:
        for k in range(8):
            both(b * BAR + k * BEAT / 2 + BEAT / 4, HATS[k % 4], 0.06, pan=-0.35)
# final kick hit on the last downbeat
both((BARS - 1) * BAR, KICK, 0.5)

# --- Bass: offbeat eighths ---
BASS_H = [(1, 1.0), (2, 0.35), (3, 0.12)]
for b in range(1, BARS - 1):
    root = ROOTS[b % 4]
    for k in range(4):
        t = b * BAR + k * BEAT + BEAT / 2
        both(t, tone(root, BEAT * 0.45, BASS_H, 0.12, attack=0.006), 0.17)
both((BARS - 1) * BAR, tone(ROOTS[0], 2.2, BASS_H, 0.7, attack=0.01), 0.17)

# --- Pluck arpeggio (16ths) with ping-pong delay ---
PLUCK_H = [(1, 1.0), (2, 0.45), (3, 0.2), (4, 0.08)]
PATTERN = [0, 1, 2, 1, 0, 2, 1, 2]
plucks = {}
for b in range(2, BARS - 1):
    ch = CHORDS[b % 4]
    for s in range(16):
        m = ch[PATTERN[s % 8]] + 12 + (12 if s % 8 == 5 else 0)
        if m not in plucks: plucks[m] = tone(m, 0.32, PLUCK_H, 0.09)
        t = b * BAR + s * BEAT / 4
        g = 0.075 if s % 4 == 0 else 0.055
        both(t, plucks[m], g, pan=0.15)
        add(R, t + BEAT * 0.75, plucks[m], g * 0.35)
        add(L, t + BEAT * 1.5, plucks[m], g * 0.18)

# --- Lead melody (bars 6-11), bright and simple ---
LEAD_H = [(1, 1.0), (2, 0.25), (3, 0.18), (5, 0.05)]
# (bar offset, beat, midi, length in beats)
PHRASE = [
    (0, 0, 76, 1.5), (0, 1.5, 74, 0.5), (0, 2, 72, 1), (0, 3, 74, 1),
    (1, 0, 72, 1.5), (1, 1.5, 69, 0.5), (1, 2, 72, 2),
    (2, 0, 67, 1), (2, 1, 72, 1), (2, 2, 76, 1.5), (2, 3.5, 74, 0.5),
    (3, 0, 74, 2), (3, 2, 71, 1), (3, 3, 74, 1),
]
for rep in (4, 8):
    for bo, bt, m, ln in PHRASE:
        bar = rep + bo
        if bar >= BARS - 1: continue
        t = bar * BAR + bt * BEAT
        note = tone(m + 12, ln * BEAT + 0.25, LEAD_H, ln * BEAT * 0.7, attack=0.012)
        both(t, note, 0.065, pan=-0.1)
        add(L, t + BEAT * 0.75, note, 0.02)
        add(R, t + BEAT * 1.5, note, 0.012)

# --- Riser into bar 6 ---
rs = int((3 * BAR) * SR); rn = int(BAR * SR)
for i in range(rn):
    t = i / rn
    v = random.uniform(-1, 1) * (t ** 2) * 0.05
    L[rs + i] += v; R[rs + i] += v

# --- Master: soft clip, fade, normalize ---
peak = 0.0
for i in range(N):
    L[i] = math.tanh(L[i] * 1.3); R[i] = math.tanh(R[i] * 1.3)
fade_n = int(0.9 * SR)
for i in range(fade_n):
    g = (1 - i / fade_n) ** 2
    L[N - fade_n + i] *= g; R[N - fade_n + i] *= g
peak = max(max(abs(x) for x in L), max(abs(x) for x in R))
scale = 0.89 / peak
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    frames = bytearray()
    for i in range(N):
        frames += struct.pack("<hh", int(L[i] * scale * 32767), int(R[i] * scale * 32767))
    w.writeframes(bytes(frames))
print("seconds", N / SR)
