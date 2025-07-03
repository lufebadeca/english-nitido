import { useState } from 'react'
import './App.css'

function WordDownloader() {
  const [text, setText] = useState('');

  async function handleDownload() {
    const modelId = 'eleven_turbo_v2';
    const defaultVoiceId = 'JBFqnCBsd6RMkjVDRZzb';
    const matildaVoiceId = 'XrExE9yKIg1WjnnlVkGX'; //Matilda
    const saraVoiceId = 'EXAVITQu4vr4xnSDxMaL'; //Sara
    const voiceId = matildaVoiceId;
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        }
      })
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Reproduce el audio
    const audio = new Audio(url);
    audio.play();

    // Descarga el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = `${text}.mp3`; // nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleSpeak() {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

  return (
    <>
      
      <h1>Speech Trainer</h1>

      <p className="read-the-docs">
        Write an English sentence and click play to listen to it.
      </p>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSpeak}>Speak with browser</button>
      {/* <button onClick={handleResponsiveVoice}>Speak with ResponsiveVoice</button> */}
      <button onClick={handleDownload}>Play with ElevenLabs (credits)</button>
    </>
  )
}

export default WordDownloader
