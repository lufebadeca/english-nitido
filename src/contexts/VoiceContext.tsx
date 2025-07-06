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
    // Load initial voice settings from localStorage if available
    const savedEngVoice = localStorage.getItem("currentEngVoice");
    if (savedEngVoice) {
      setCurrentEngVoice(JSON.parse(savedEngVoice));
    }
    const savedEspVoice = localStorage.getItem("currentEspVoice");
    if (savedEspVoice) {
      setCurrentEspVoice(JSON.parse(savedEspVoice));
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
