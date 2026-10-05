'use client'

import { startTransition, useActionState, useRef, useState } from 'react'

import { submitWithdrawal, type WithdrawalState } from '@/app/(frontend)/retragere/actions'
import { COMPANY } from '@/lib/legal'

/**
 * Funcția de retragere din contract (art. 11a din Directiva 2011/83/UE, introdus
 * de Directiva (UE) 2023/2673): pasul 1 — datele; pasul 2 — „Confirmă retragerea”.
 */

const PRODUCTS = [
  { value: 'single', label: 'Un plic (o lună) — 60 lei' },
  { value: 'monthly', label: 'Abonament 12 luni — plată lunară (55 lei / lună)' },
  { value: 'annual', label: 'Abonament 12 luni — plată integrală (660 lei)' },
]

type Summary = { label: string; value: string }[]

export function WithdrawalForm() {
  const [state, formAction, pending] = useActionState<WithdrawalState, FormData>(submitWithdrawal, { status: 'idle' })
  // Pasul de confirmare ține minte rezultatul la care a fost deschis: dacă între
  // timp serverul întoarce o eroare, revenim automat la câmpuri.
  const [confirmedAt, setConfirmedAt] = useState<WithdrawalState | null>(null)
  const step: 'edit' | 'confirm' = confirmedAt !== null && confirmedAt === state ? 'confirm' : 'edit'
  const [summary, setSummary] = useState<Summary>([])
  const formRef = useRef<HTMLFormElement>(null)

  if (state.status === 'done') {
    return (
      <div className="pl-withdraw__done" role="status">
        <h2 className="pl-legal__h2">Am primit declarația ta de retragere</h2>
        <dl className="pl-withdraw__summary">
          <div>
            <dt>Număr de înregistrare</dt>
            <dd>{state.reference}</dd>
          </div>
          <div>
            <dt>Primită la</dt>
            <dd>{state.submittedAt}</dd>
          </div>
        </dl>
        <p>
          {state.emailSent
            ? `Ți-am trimis confirmarea de primire la ${state.email}. Păstreaz-o — este dovada retragerii.`
            : `Îți trimitem confirmarea de primire la ${state.email} cât mai curând. Până atunci, păstrează numărul de înregistrare de mai sus (poți salva sau tipări pagina).`}
        </p>
        <p>
          Îți returnăm banii în cel mult 14 zile, cu aceeași metodă de plată. Dacă ai primit deja plicuri, te rugăm să le
          trimiți înapoi în cel mult 14 zile; îți scriem adresa de retur. Întrebări: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <button type="button" className="pl-btn pl-btn--ghost pl-btn--sm" onClick={() => window.print()}>
          Tipărește confirmarea
        </button>
      </div>
    )
  }

  const fieldError = (name: 'name' | 'email' | 'product' | 'contract') =>
    state.status === 'error' ? state.fields?.[name] : undefined

  const goToConfirm = () => {
    const form = formRef.current
    if (!form || !form.reportValidity()) return
    const data = new FormData(form)
    const product = PRODUCTS.find((p) => p.value === data.get('product'))?.label ?? ''
    const rows: Summary = [
      { label: 'Nume', value: String(data.get('name') ?? '') },
      { label: 'Email pentru confirmare', value: String(data.get('email') ?? '') },
      { label: 'Produs', value: product },
      { label: 'Identificarea comenzii', value: String(data.get('contract') ?? '') },
      { label: 'Adresa de livrare', value: String(data.get('address') ?? '') },
      { label: 'Mențiuni', value: String(data.get('message') ?? '') },
    ].filter((row) => row.value.trim())
    setSummary(rows)
    setConfirmedAt(state)
  }

  return (
    <form
      ref={formRef}
      className="pl-withdraw"
      noValidate={step === 'confirm'}
      onSubmit={(event) => {
        event.preventDefault()
        if (step !== 'confirm') return goToConfirm()
        // Trimitere manuală: o acțiune pusă direct pe <form> golește câmpurile,
        // iar la o eroare clientul ar trebui să le completeze din nou.
        const data = new FormData(event.currentTarget)
        startTransition(() => formAction(data))
      }}
    >
      {state.status === 'error' ? (
        <p className="pl-withdraw__error" role="alert">
          {state.message}
        </p>
      ) : null}

      <fieldset className="pl-withdraw__fields" hidden={step === 'confirm'}>
        <legend className="pl-sr">Datele declarației de retragere</legend>

        <label className="pl-field">
          <span>Nume și prenume *</span>
          <input name="name" type="text" autoComplete="name" required maxLength={200} />
          {fieldError('name') ? <small className="pl-field__error">{fieldError('name')}</small> : null}
        </label>

        <label className="pl-field">
          <span>Email (aici primești confirmarea) *</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
          {fieldError('email') ? <small className="pl-field__error">{fieldError('email')}</small> : null}
        </label>

        <label className="pl-field">
          <span>Produsul la care renunți *</span>
          <select name="product" required defaultValue="">
            <option value="" disabled>
              Alege…
            </option>
            {PRODUCTS.map((product) => (
              <option key={product.value} value={product.value}>
                {product.label}
              </option>
            ))}
          </select>
          {fieldError('product') ? <small className="pl-field__error">{fieldError('product')}</small> : null}
        </label>

        <label className="pl-field">
          <span>Identificarea comenzii *</span>
          <textarea
            name="contract"
            required
            rows={3}
            maxLength={2000}
            placeholder="ex. data comenzii, emailul folosit la plată, numărul chitanței Stripe"
          />
          {fieldError('contract') ? <small className="pl-field__error">{fieldError('contract')}</small> : null}
        </label>

        <label className="pl-field">
          <span>Adresa de livrare (opțional)</span>
          <textarea name="address" rows={2} maxLength={1000} autoComplete="street-address" />
        </label>

        <label className="pl-field">
          <span>Mențiuni (opțional)</span>
          <textarea name="message" rows={3} maxLength={2000} />
        </label>

        <label className="pl-withdraw__trap" aria-hidden="true">
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>

        <button type="button" className="pl-btn pl-btn--ghost" onClick={goToConfirm}>
          Continuă
        </button>
      </fieldset>

      {step === 'confirm' ? (
        <div className="pl-withdraw__confirm">
          <h2 className="pl-legal__h2">Verifică și confirmă</h2>
          <p>
            Prin apăsarea butonului de mai jos declari că te retragi din contractul de vânzare pentru produsul ales.
          </p>
          <dl className="pl-withdraw__summary">
            {summary.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="pl-withdraw__actions">
            <button type="submit" className="pl-btn pl-btn--gold" disabled={pending}>
              {pending ? 'Se trimite…' : 'Confirmă retragerea'}
            </button>
            <button type="button" className="pl-cc__link" onClick={() => setConfirmedAt(null)} disabled={pending}>
              Modifică datele
            </button>
          </div>
        </div>
      ) : null}
    </form>
  )
}
