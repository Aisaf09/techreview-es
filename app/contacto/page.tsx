'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import BreadCrumbs from '@/components/BreadCrumbs'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactoPage() {
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim())    e.name    = 'El nombre es obligatorio.'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido.'
    if (!form.subject.trim()) e.subject = 'El asunto es obligatorio.'
    if (form.message.trim().length < 20) e.message = 'El mensaje debe tener al menos 20 caracteres.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('success')
  }

  const field = (id: keyof typeof form, label: string, type = 'text', textarea = false) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none transition-shadow"
          aria-describedby={errors[id] ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
          aria-describedby={errors[id] ? `${id}-error` : undefined}
        />
      )}
      {errors[id] && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs mt-1">
          <AlertCircle size={11} aria-hidden="true" /> {errors[id]}
        </p>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadCrumbs crumbs={[{ label: 'Contacto' }]} />

      <div className="mt-8 mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2">Contacto</h1>
        <p className="text-gray-500 dark:text-gray-400">¿Tienes una pregunta, sugerencia o propuesta de colaboración? Escríbenos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex gap-4">
            <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center shrink-0">
              <Mail size={16} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">Email</p>
              <a href="mailto:hola@techreview.es" className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">hola@techreview.es</a>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex gap-4">
            <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">Tiempo de respuesta</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">24-48 horas laborables</p>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">Nota sobre relaciones comerciales</p>
            <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed">No aceptamos contenido patrocinado, artículos de pago ni reviews pagadas. Las colaboraciones se limitan a préstamos de dispositivos para análisis.</p>
          </div>
        </aside>

        {/* Form */}
        <div className="md:col-span-2">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-10 text-center">
              <CheckCircle size={40} className="text-green-500" aria-hidden="true" />
              <p className="font-black text-gray-900 dark:text-white text-lg">¡Mensaje enviado!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Te responderemos en las próximas 24-48 horas laborables.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 card-shadow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field('name',  'Nombre')}
                {field('email', 'Email', 'email')}
              </div>
              {field('subject', 'Asunto')}
              {field('message', 'Mensaje', 'text', true)}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                {status === 'loading' ? <Loader size={15} className="animate-spin" aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
