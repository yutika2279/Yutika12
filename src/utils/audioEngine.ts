/**
 * Web Audio API synthesized ambient café soundscapes.
 * Provides soft warm vinyl lo-fi crackle, gentle rain, and cafe atmosphere.
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentType: 'lofi' | 'rain' | 'chatter' = 'lofi';
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private chordInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, val * 0.3)), this.ctx.currentTime, 0.1);
    }
  }

  public play(type: 'lofi' | 'rain' | 'chatter' = 'lofi') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.isPlaying = true;
    this.currentType = type;

    if (type === 'lofi') {
      this.startLofi();
    } else if (type === 'rain') {
      this.startRain();
    } else {
      this.startChatter();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    if (this.chordInterval) {
      window.clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
  }

  public toggle(type: 'lofi' | 'rain' | 'chatter' = 'lofi'): boolean {
    if (this.isPlaying && this.currentType === type) {
      this.stop();
      return false;
    } else {
      this.play(type);
      return true;
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      type: this.currentType,
    };
  }

  // --- Synthesizers ---

  private startLofi() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Vinyl crackle noise
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Occasional crackle pops
      const isPop = Math.random() < 0.0008;
      output[i] = isPop ? (Math.random() * 2 - 1) * 0.4 : (Math.random() * 2 - 1) * 0.015;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.2;

    this.noiseNode.connect(filter);
    filter.connect(this.masterGain);
    this.noiseNode.start();

    // 2. Gentle warm Rhode-style soothing chord progression every 8 seconds
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G7
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const freqs = chords[chordIdx % chords.length];
      chordIdx++;

      freqs.forEach((f, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const chordFilter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        chordFilter.type = 'lowpass';
        chordFilter.frequency.setValueAtTime(600 + i * 50, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.045, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.5);

        osc.connect(chordFilter);
        chordFilter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 7);
      });
    };

    playChord();
    this.chordInterval = window.setInterval(playChord, 7500);
  }

  private startRain() {
    if (!this.ctx || !this.masterGain) return;

    // Pink-ish noise filter for gentle rainfall against cafe glass
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.08;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 850;

    this.noiseNode.connect(filter);
    filter.connect(this.masterGain);
    this.noiseNode.start();
  }

  private startChatter() {
    if (!this.ctx || !this.masterGain) return;

    // Warm muffled background ambience
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 450;
    filter.Q.value = 2.0;

    this.noiseNode.connect(filter);
    filter.connect(this.masterGain);
    this.noiseNode.start();
  }
}

export const ambientAudio = new AmbientAudioEngine();
