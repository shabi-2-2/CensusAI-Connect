/**
 * useSpeechRecognition
 *
 * A lightweight wrapper around the browser Web Speech API.
 * - Appends transcript into a caller-provided callback.
 * - Handles browsers that don't support SpeechRecognition gracefully.
 * - Does NOT record, store, or upload audio anywhere.
 */

"use client";

import * as React from "react";

// ---------------------------------------------------------------------------
// Web Speech API type shims (the built-in lib may not include these)
// ---------------------------------------------------------------------------
interface SpeechRecognitionResultItem {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionResultItem;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionConstructor {
  new(): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}
// ---------------------------------------------------------------------------

export type SpeechRecognitionStatus = "idle" | "listening" | "error" | "unsupported";

interface UseSpeechRecognitionOptions {
  /** Called each time a final transcript segment is available. */
  onTranscript: (text: string) => void;
  /** BCP-47 language tag, e.g. "en-IN", "hi-IN". Defaults to browser locale. */
  language?: string;
}

interface UseSpeechRecognitionReturn {
  status: SpeechRecognitionStatus;
  errorMessage: string | null;
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;
}

export function useSpeechRecognition({
  onTranscript,
  language,
}: UseSpeechRecognitionOptions): UseSpeechRecognitionReturn {
  const [status, setStatus] = React.useState<SpeechRecognitionStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const recognitionRef = React.useRef<ISpeechRecognition | null>(null);

  const isSupported =
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const startListening = React.useCallback(() => {
    if (!isSupported) {
      setStatus("unsupported");
      setErrorMessage(
        "Voice input is not supported in this browser. Please type your household information instead."
      );
      return;
    }

    // Stop any existing session before starting a new one
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;      // Keep listening until explicitly stopped
    recognition.interimResults = false; // Only fire for final results
    recognition.lang = language || navigator.language || "en-IN";
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setStatus("listening");
      setErrorMessage(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript.trim()) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let msg = "Speech recognition error. Please try again.";
      switch (event.error) {
        case "no-speech":
          msg = "No speech detected. Please speak clearly near your microphone.";
          break;
        case "audio-capture":
          msg = "Microphone not accessible. Please check your browser permissions.";
          break;
        case "not-allowed":
          msg = "Microphone access was denied. Please allow microphone access and try again.";
          break;
        case "network":
          msg = "A network error occurred during speech recognition. Please try again.";
          break;
        case "aborted":
          // User or code stopped it — not an error worth surfacing
          return;
      }
      setStatus("error");
      setErrorMessage(msg);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setStatus((prev) => (prev === "listening" ? "idle" : prev));
      recognitionRef.current = null;
    };

    recognition.start();
  }, [isSupported, language, onTranscript]);

  const stopListening = React.useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setStatus("idle");
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return { status, errorMessage, startListening, stopListening, isSupported };
}
