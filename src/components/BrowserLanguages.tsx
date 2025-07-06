import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import { useVoice } from "../contexts/VoiceContext";

function VoiceList() {
  const {
    currentEngVoice,
    setCurrentEngVoice,
    currentEspVoice,
    setCurrentEspVoice,
  } = useVoice();
  const [engVoices, setEngVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [espVoices, setEspVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [engVoiceIndex, setEngVoiceIndex] = useState<number>(0);
  const [espVoiceIndex, setEspVoiceIndex] = useState<number>(0);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      const engVoices = voices.filter(
        (voice) =>
          voice.lang.startsWith("en-US") || voice.lang.startsWith("en_US")
      );
      if (engVoices.length > 0) {
        setEngVoices(engVoices);
        const engVoiceIndex = engVoices.indexOf(currentEngVoice);
        console.log("engVoiceIndex: " + engVoiceIndex);
        setEngVoiceIndex(engVoiceIndex);
      }

      const espVoices = voices.filter(
        (voice) =>
          voice.lang.startsWith("es-MX") || voice.lang.startsWith("es_MX")
      );
      if (espVoices.length > 0) {
        setEspVoices(espVoices);
        const espVoiceIndex = espVoices.indexOf(currentEspVoice);
        console.log("espVoiceIndex: " + espVoiceIndex);
        setEspVoiceIndex(espVoiceIndex);
      }
    };

    // Initial load
    loadVoices();

    // Listen for voice changes
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleEngVoiceChange = (voice: SpeechSynthesisVoice) => {
    setCurrentEngVoice({ lang: voice.lang, name: voice.name });
    const engVoiceIndex = Number(localStorage.getItem("engVoiceIndex")) || 0;
    setEngVoiceIndex(engVoiceIndex);
  };

  const handleEspVoiceChange = (voice: SpeechSynthesisVoice) => {
    setCurrentEspVoice({ lang: voice.lang, name: voice.name });
    const espVoiceIndex = Number(localStorage.getItem("espVoiceIndex")) || 0;
    setEspVoiceIndex(espVoiceIndex);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Configurar Voz</h3>

      <div className="space-y-2">
        <h4>Voz en inglés</h4>
        <select
          className="p-2 border block border-gray-200 rounded"
          value={engVoiceIndex}
          onChange={(e) => {
            const selectedIndex = Number(e.target.value);
            if (selectedIndex >= 0 && selectedIndex < engVoices.length) {
              handleEngVoiceChange(engVoices[selectedIndex]);
            }
          }}
        >
          {engVoices.map((voice, index) => (
            <option key={index} value={index}>
              {`${voice.name} (${voice.lang})`}
            </option>
          ))}
        </select>

        <h4>Voz en español</h4>
        <select
          className="p-2 border block border-gray-200 rounded"
          value={espVoiceIndex}
          onChange={(e) => {
            const selectedIndex = Number(e.target.value);
            if (selectedIndex >= 0 && selectedIndex < espVoices.length) {
              handleEspVoiceChange(espVoices[selectedIndex]);
            }
          }}
        >
          {espVoices.map((voice, index) => (
            <option key={index} value={index}>
              {`${voice.name} (${voice.lang})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default VoiceList;
