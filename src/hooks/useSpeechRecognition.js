import { useState, useEffect, useRef, useCallback } from 'react'

export function useSpeechRecognition({ onResult } = {}) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      recognition.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' '
          }
        }
        if (transcript.trim() && onResult) {
          onResult(transcript.trim())
        }
      }

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error)
        if (event.error === 'not-allowed') {
          setError('Microphone permission denied. Please allow microphone access.')
        } else {
          setError(`Speech error: ${event.error}`)
        }
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } else {
      setIsSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (_) {}
      }
    }
  }, [onResult])

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return
    setError(null)
    try {
      recognitionRef.current.start()
    } catch (err) {
      console.warn('Error starting speech recognition:', err)
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return
    try {
      recognitionRef.current.stop()
    } catch (_) {}
    setIsListening(false)
  }, [isListening])

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  return {
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    toggleListening,
  }
}
