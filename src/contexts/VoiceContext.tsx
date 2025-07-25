import React, { createContext, useContext, useState, useEffect } from "react";

interface VoiceContextType {
  currentEngVoice: { lang: string; name: string } | null;
  setCurrentEngVoice: (voice: { lang: string; name: string }) => void;
  currentEspVoice: { lang: string; name: string } | null;
  setCurrentEspVoice: (voice: { lang: string; name: string }) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [currentEngVoice, setCurrentEngVoice] = useState<{
    lang: string;
    name: string;
  } | null>(null);

  const [currentEspVoice, setCurrentEspVoice] = useState<{
    lang: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const espVoices = window.speechSynthesis
        .getVoices()
        .filter(
          (voice) =>
            voice.lang.startsWith("es-MX") ||
            voice.lang.startsWith("es_MX") ||
            voice.lang.startsWith("es-US") ||
            voice.lang.startsWith("es_US") ||
            voice.lang.startsWith("es-ES") ||
            voice.lang.startsWith("es_ES")
        );
      const engVoices = window.speechSynthesis
        .getVoices()
        .filter(
          (voice) =>
            voice.lang.startsWith("en-US") || voice.lang.startsWith("en_US")
        );
      return { espVoices, engVoices };
    };
    const { espVoices, engVoices } = loadVoices();
    // Load initial voice settings from localStorage if available
    const savedEngVoice = localStorage.getItem("currentEngVoice");
    if (savedEngVoice) {
      setCurrentEngVoice(JSON.parse(savedEngVoice));
    } else {
      setCurrentEngVoice(engVoices[0]);
    }
    const savedEspVoice = localStorage.getItem("currentEspVoice");
    if (savedEspVoice) {
      setCurrentEspVoice(JSON.parse(savedEspVoice));
    } else {
      setCurrentEspVoice(espVoices[0]);
    }
  }, []);

  // Save voice settings to localStorage whenever they change
  useEffect(() => {
    if (currentEngVoice) {
      localStorage.setItem("currentEngVoice", JSON.stringify(currentEngVoice));
    }
  }, [currentEngVoice]);

  // Save voice settings to localStorage whenever they change
  useEffect(() => {
    if (currentEspVoice) {
      localStorage.setItem("currentEspVoice", JSON.stringify(currentEspVoice));
    }
  }, [currentEspVoice]);

  return (
    <VoiceContext.Provider
      value={{
        currentEngVoice,
        setCurrentEngVoice,
        currentEspVoice,
        setCurrentEspVoice,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
}
