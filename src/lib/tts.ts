// Text-to-speech service
export class TTSService {
  private static instance: TTSService;
  private speaking: boolean = false;
  private speechSynthesis: SpeechSynthesis;
  private preferredVoice: SpeechSynthesisVoice | null = null;

  private constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.initVoice();
  }

  public static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  private async initVoice() {
    // Wait for voices to be loaded
    if (this.speechSynthesis.getVoices().length === 0) {
      await new Promise<void>(resolve => {
        this.speechSynthesis.addEventListener('voiceschanged', () => resolve(), { once: true });
      });
    }

    // Find an English voice
    const voices = this.speechSynthesis.getVoices();
    this.preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && !voice.localService
    ) || voices[0];
  }

  public speak(text: string): void {
    if (this.speaking) {
      this.stop();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.preferredVoice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      this.speaking = true;
    };

    utterance.onend = () => {
      this.speaking = false;
    };

    utterance.onerror = () => {
      this.speaking = false;
    };

    this.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    this.speechSynthesis.cancel();
    this.speaking = false;
  }

  public isSpeaking(): boolean {
    return this.speaking;
  }
}