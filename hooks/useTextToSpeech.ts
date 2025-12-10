import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    synth.current = window.speechSynthesis;
    
    // Ensure we handle page unmounts
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!synth.current) return;

    // Cancel any ongoing speech
    if (synth.current.speaking) {
      synth.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Default to Spanish as per user context

    // Try to find a good Spanish voice
    const voices = synth.current.getVoices();
    const esVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Google') || v.name.includes('Microsoft')));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synth.current.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (synth.current) {
      synth.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { isSpeaking, speak, stop };
};