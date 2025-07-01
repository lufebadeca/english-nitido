import { useEffect, useState } from 'react';

function VoiceList() {
  const [voices, setVoices] = useState<string[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length > 0) {
        setVoices(allVoices.map(v => `${v.name} (${v.lang})`));
      } else {
        // Esperar un poco si aún no están cargadas
        setTimeout(loadVoices, 300);
      }
    };

    loadVoices();
  }, []);

  return (
    <div className="p-4 bg-yellow-100 rounded">
      <h2 className="font-bold mb-2 text-yellow-800">Voces disponibles:</h2>
      <ul className="list-disc list-inside text-gray-800">
        {voices.map((voice, idx) => (
          <li key={idx}>{voice}</li>
        ))}
      </ul>
    </div>
  );
}

export default VoiceList;
