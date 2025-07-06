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

      // Filter English voices
      const engVoices = voices.filter(
        (voice) =>
          voice.lang.startsWith("en-US") || voice.lang.startsWith("en_US")
      );

      if (engVoices.length > 0) {
        setEngVoices(engVoices);

        // Initialize English voice if not set
        if (!currentEngVoice) {
          setCurrentEngVoice({
            lang: engVoices[0].lang,
            name: engVoices[0].name,
          });
        }

        // Find selected voice index
        const engVoiceIndex = engVoices.findIndex(
          (voice) => voice.name === currentEngVoice?.name
        );

        // If voice not found, use first voice
        if (engVoiceIndex === -1) {
          setCurrentEngVoice({
            lang: engVoices[0].lang,
            name: engVoices[0].name,
          });
          setEngVoiceIndex(0);
        } else {
          setEngVoiceIndex(engVoiceIndex);
        }
      }

      // Filter Spanish voices
      const espVoices = voices.filter(
        (voice) =>
          voice.lang.startsWith("es-MX") ||
          voice.lang.startsWith("es_MX") ||
          voice.lang.startsWith("es-US") ||
          voice.lang.startsWith("es_US") ||
          voice.lang.startsWith("es-ES") ||
          voice.lang.startsWith("es_ES")
      );

      if (espVoices.length > 0) {
        setEspVoices(espVoices);

        // Initialize Spanish voice if not set
        if (!currentEspVoice) {
          setCurrentEspVoice({
            lang: espVoices[0].lang,
            name: espVoices[0].name,
          });
        }

        // Find selected voice index
        const espVoiceIndex = espVoices.findIndex(
          (voice) => voice.name === currentEspVoice?.name
        );

        // If voice not found, use first voice
        if (espVoiceIndex === -1) {
          setCurrentEspVoice({
            lang: espVoices[0].lang,
            name: espVoices[0].name,
          });
          setEspVoiceIndex(0);
        } else {
          setEspVoiceIndex(espVoiceIndex);
        }
      }
    };

    // Initial load
    loadVoices();

    // Listen for voice changes
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [currentEngVoice, currentEspVoice]);

  const handleEngVoiceChange = (voice: SpeechSynthesisVoice) => {
    setCurrentEngVoice({ lang: voice.lang, name: voice.name });
    const selectedIndex = engVoices.findIndex((v) => v.name === voice.name);
    if (selectedIndex !== -1) {
      setEngVoiceIndex(selectedIndex);
    }
  };

  const handleEspVoiceChange = (voice: SpeechSynthesisVoice) => {
    setCurrentEspVoice({ lang: voice.lang, name: voice.name });
    const selectedIndex = espVoices.findIndex((v) => v.name === voice.name);
    if (selectedIndex !== -1) {
      setEspVoiceIndex(selectedIndex);
    }
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
