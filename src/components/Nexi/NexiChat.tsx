'use client'

import { useState, useRef, useEffect } from 'react'

export function NexiChat() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([{
    role: 'nexi',
    content: 'Hola, soy NEXI. Estoy aquí para asistirte en tu aprendizaje. ¿En qué puedo ayudarte?'
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Simular respuesta de IA (en producción conectar con API)
      setTimeout(() => {
        const responses = [
          'Excelente pregunta. Te puedo ayudar con eso.',
          'Ese es un punto muy importante del curso.',
          'Déjame darte más contexto sobre ese tema.',
        ]
        const nexiMessage = {
          role: 'nexi',
          content: responses[Math.floor(Math.random() * responses.length)],
        }
        setMessages((prev) => [...prev, nexiMessage])
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  return (
    <div className="bg-nexiom-blue border border-nexiom-bronze rounded-lg overflow-hidden flex flex-col h-96">
      <div className="bg-nexiom-bronze-light p-4 font-bold">💡 NEXI - Asistente IA</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-nexiom-bronze-light text-white'
                  : 'bg-nexiom-dark text-gray-300'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-nexiom-dark px-3 py-2 rounded-lg text-gray-400">Escribiendo...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-nexiom-bronze p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pregunta a NEXI..."
          className="flex-1 bg-nexiom-dark border border-nexiom-bronze rounded px-3 py-2 text-sm text-white placeholder-gray-500"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-nexiom-bronze-light text-white px-3 py-2 rounded text-sm font-bold hover:bg-nexiom-bronze disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  )
}
