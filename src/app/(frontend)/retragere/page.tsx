import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPage } from '@/components/LegalPage'
import { WithdrawalForm } from '@/components/WithdrawalForm'
import { COMPANY } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Retrage-te din contract',
  description: 'Funcția online prin care te poți retrage din contractul încheiat cu Poșta Lunii, în termenul legal de 14 zile.',
  alternates: { canonical: '/retragere' },
  robots: { index: false, follow: true },
}

export default function WithdrawalPage() {
  return (
    <LegalPage
      title="Retrage-te din contract"
      hideUpdated
      intro={
        <>
          <p>
            Ai dreptul să te retragi din contract în 14 zile de la primirea primului plic, fără să dai vreun motiv.
            Completează datele de mai jos, verifică-le, apoi apasă „Confirmă retragerea”. Primești imediat un număr de
            înregistrare și, pe email, confirmarea de primire.
          </p>
          <p className="pl-muted">
            Vrei doar să oprești plățile lunare după cele 14 zile? Nu ai nevoie de acest formular — scrie-ne la{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> și anulăm abonamentul pentru lunile viitoare. Toate
            detaliile sunt în <Link href="/termeni-si-conditii#retragere">Termeni și condiții</Link>.
          </p>
        </>
      }
    >
      <WithdrawalForm />
    </LegalPage>
  )
}
