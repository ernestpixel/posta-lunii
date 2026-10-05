'use client'

import Link from 'next/link'
import { createContext, useCallback, useContext, useId, useMemo, useRef, useState } from 'react'

/**
 * Acceptarea Termenilor înainte de plată. Butoanele de checkout duc pe Stripe;
 * cât timp bifa nu e pusă, click-ul e oprit și atenția merge pe bifă.
 */

type TermsState = {
  accepted: boolean
  /** Returnează `true` dacă se poate merge la plată. */
  requireAcceptance: () => boolean
}

const TermsContext = createContext<TermsState>({ accepted: true, requireAcceptance: () => true })

export const useTerms = () => useContext(TermsContext)

export function TermsGate({ children }: { children: React.ReactNode }) {
  const [accepted, setAccepted] = useState(false)
  const [showError, setShowError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const requireAcceptance = useCallback(() => {
    if (accepted) return true
    setShowError(true)
    inputRef.current?.focus({ preventScroll: true })
    inputRef.current?.closest('.pl-terms')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return false
  }, [accepted])

  const value = useMemo(() => ({ accepted, requireAcceptance }), [accepted, requireAcceptance])

  return (
    <TermsContext.Provider value={value}>
      {children}
      <div className={`pl-terms${showError && !accepted ? ' is-error' : ''}`}>
        <label className="pl-terms__label" htmlFor={`${id}-terms`}>
          <input
            ref={inputRef}
            id={`${id}-terms`}
            type="checkbox"
            checked={accepted}
            aria-describedby={showError && !accepted ? `${id}-error` : undefined}
            aria-invalid={showError && !accepted ? true : undefined}
            onChange={(event) => {
              setAccepted(event.target.checked)
              if (event.target.checked) setShowError(false)
            }}
          />
          <span>
            Am citit și accept <Link href="/termeni-si-conditii">Termenii și condițiile</Link>, inclusiv condițiile
            abonamentului și ale dreptului de retragere, și am luat la cunoștință{' '}
            <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>.
          </span>
        </label>
        {showError && !accepted ? (
          <p id={`${id}-error`} className="pl-terms__error" role="alert">
            Bifează acordul cu Termenii și condițiile ca să poți merge la plată.
          </p>
        ) : null}
      </div>
    </TermsContext.Provider>
  )
}
