export class AudioManager {
  private static instance: AudioManager;
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  private constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private loadVoices(): void {
    const updateVoices = () => {
      this.voices = this.synth.getVoices().filter(voice => 
        voice.lang.startsWith('en')
      );
    };

    updateVoices();
    
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  speakWord(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Use a British or American English voice if available
      const preferredVoice = this.voices.find(voice => 
        voice.name.includes('English') || voice.lang === 'en-US' || voice.lang === 'en-GB'
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = options.rate || 0.8;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);

      this.synth.speak(utterance);
    });
  }

  speakSentence(text: string): Promise<void> {
    return this.speakWord(text, { rate: 0.7 });
  }

  stopSpeaking(): void {
    this.synth.cancel();
  }
}

export const audioManager = AudioManager.getInstance();