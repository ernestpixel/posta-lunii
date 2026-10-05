'use client'

import { useId, useState } from 'react'
import type { Plan } from '@/lib/content'
import { useTerms } from './TermsConsent'

type Props = { plan: Plan }

const isExternal = (url: string) => /^https?:\/\//.test(url)

/**
 * Butonul de checkout al unui plan. Dacă planul are cel puțin două variante de
 * plată (ex. lunar / integral), afișează întâi un selector, iar butonul duce la
 * linkul variantei alese.
 */
export function PlanCheckout({ plan }: Props) {
  const name = useId()
  const options = (plan.paymentOptions ?? []).filter((option) => option.label && option.checkoutUrl)
  const [selected, setSelected] = useState(0)
  const { requireAcceptance } = useTerms()

  const hasChoice = options.length >= 2
  const href = (hasChoice ? options[selected]?.checkoutUrl : plan.checkoutUrl) || '#'

  return (
    <>
      {hasChoice ? (
        <fieldset className="pl-paychoice">
          <legend className="pl-paychoice__legend">Cum vrei să plătești?</legend>
          {options.map((option, index) => (
            <label key={`${option.label}-${index}`} className="pl-paychoice__option">
              <input
                type="radio"
                name={name}
                value={index}
                checked={selected === index}
                onChange={() => setSelected(index)}
              />
              <span className="pl-paychoice__text">
                <b>{option.label}</b>
                {option.detail ? <span>{option.detail}</span> : null}
              </span>
            </label>
          ))}
        </fieldset>
      ) : null}
      <a
        className={`pl-btn ${plan.featured ? 'pl-btn--gold' : 'pl-btn--ghost'} pl-btn--block`}
        href={href}
        onClick={(event) => {
          if (!requireAcceptance()) event.preventDefault()
        }}
        {...(isExternal(href) ? { rel: 'noopener', target: '_blank' } : {})}
      >
        {plan.ctaLabel}
        {plan.featured ? (
          <>
            {' '}
            <span className="pl-btn__arrow" aria-hidden="true">
              →
            </span>
          </>
        ) : null}
      </a>
    </>
  )
}
