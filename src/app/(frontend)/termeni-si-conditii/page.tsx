import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPage, LegalSection, LegalToc } from '@/components/LegalPage'
import { ANPC, COMPANY, WITHDRAWAL_HREF } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Termeni și condiții',
  description:
    'Termenii și condițiile de vânzare pentru Poșta Lunii: plicul lunar, abonamentul de 12 luni, plata, livrarea, dreptul de retragere și reclamațiile.',
  alternates: { canonical: '/termeni-si-conditii' },
}

const SECTIONS = [
  { id: 'cine-suntem', title: '1. Cine suntem' },
  { id: 'acceptare', title: '2. Acceptarea termenilor' },
  { id: 'produse', title: '3. Ce primești' },
  { id: 'preturi', title: '4. Prețuri' },
  { id: 'comanda', title: '5. Comanda și încheierea contractului' },
  { id: 'plata', title: '6. Plata' },
  { id: 'abonamente', title: '7. Abonamentele' },
  { id: 'livrare', title: '8. Livrarea' },
  { id: 'retragere', title: '9. Dreptul de retragere' },
  { id: 'conformitate', title: '10. Conformitatea produselor' },
  { id: 'donatie', title: '11. Donația către adăpost' },
  { id: 'proprietate', title: '12. Proprietate intelectuală' },
  { id: 'raspundere', title: '13. Răspundere' },
  { id: 'date', title: '14. Datele personale' },
  { id: 'reclamatii', title: '15. Reclamații și soluționarea litigiilor' },
  { id: 'modificari', title: '16. Modificarea termenilor și legea aplicabilă' },
  { id: 'formular', title: 'Anexă — Formular de retragere' },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Termeni și condiții"
      intro={
        <p>
          Acești termeni se aplică tuturor comenzilor plasate pe site-ul Poșta Lunii. Sunt scriși cât mai simplu, dar au
          valoare de contract — te rugăm să-i citești înainte de a plăti.
        </p>
      }
    >
      <LegalToc items={SECTIONS} />

      <LegalSection id="cine-suntem" title="1. Cine suntem">
        <p>Poșta Lunii este un proiect operat de:</p>
        <ul>
          <li>
            <b>{COMPANY.name}</b>
          </li>
          <li>Sediul: {COMPANY.address}</li>
          <li>Cod unic de înregistrare (CUI): {COMPANY.cui}</li>
          <li>Număr de ordine în Registrul Comerțului: {COMPANY.regCom}</li>
          <li>Identificator unic la nivel european (EUID): {COMPANY.euid}</li>
          <li>
            Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </li>
        </ul>
        <p>În acești termeni, „noi” înseamnă comerciantul de mai sus, iar „tu” înseamnă clientul care cumpără.</p>
      </LegalSection>

      <LegalSection id="acceptare" title="2. Acceptarea termenilor">
        <p>
          Vindem doar către persoane fizice cu vârsta de cel puțin 18 ani, care cumpără în calitate de consumatori. Înainte
          de a merge la plată, îți ceri acordul cu acești termeni prin bifarea căsuței de lângă butoanele de comandă.
          Versiunea în vigoare la data comenzii este cea care se aplică contractului tău.
        </p>
      </LegalSection>

      <LegalSection id="produse" title="3. Ce primești">
        <p>
          Poșta Lunii este un plic tematic trimis prin poștă. Fiecare ediție conține, de regulă, o scrisoare scrisă în
          jurul temei lunii, un exercițiu de scriere creativă sau de journaling, un cartonaș cu o recomandare de carte și
          mici surprize care se schimbă de la o lună la alta.
        </p>
        <p>
          Conținutul exact al fiecărei ediții se schimbă lunar și poate varia ușor față de imaginile de pe site, care sunt
          orientative. Caracteristicile esențiale (o ediție tipărită pe lună, livrată prin poștă) rămân aceleași.
        </p>
      </LegalSection>

      <LegalSection id="preturi" title="4. Prețuri">
        <ul>
          <li>Un plic (o lună): 60 lei.</li>
          <li>Abonament de 12 luni, plată integrală: 660 lei, plătiți o singură dată.</li>
          <li>Abonament de 12 luni, plată lunară: 55 lei pe lună, 12 plăți.</li>
        </ul>
        <p>
          Prețurile sunt în lei (RON) și sunt prețuri finale. {COMPANY.shortName} nu este înregistrată în scopuri de TVA,
          așa că prețurile nu conțin TVA. Prețul include livrarea prin poștă la o adresă din România — nu există alte
          costuri adăugate la plată.
        </p>
        <p>
          Putem schimba prețurile pentru comenzile viitoare. Schimbarea nu afectează comenzile deja plătite și nici
          abonamentele în curs, pentru care prețul rămâne cel de la data comenzii până la sfârșitul celor 12 luni.
        </p>
      </LegalSection>

      <LegalSection id="comanda" title="5. Comanda și încheierea contractului">
        <ol>
          <li>Alegi produsul în secțiunea „Prețuri” și, pentru abonament, modul de plată (lunar sau integral).</li>
          <li>Bifezi acordul cu acești termeni și apeși butonul de comandă.</li>
          <li>
            Ești dus pe pagina de plată securizată Stripe, unde completezi adresa de livrare, datele de contact și datele
            cardului și confirmi plata.
          </li>
        </ol>
        <p>
          Contractul se încheie în momentul în care plata este confirmată. Primești pe email confirmarea plății (chitanța
          Stripe), care conține detaliile comenzii. Te rugăm să verifici că adresa de livrare și emailul sunt corecte;
          dacă ai greșit ceva, scrie-ne cât mai repede la <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>
          Putem refuza sau anula o comandă doar pentru motive întemeiate (de exemplu, o adresă de livrare din afara
          României sau o suspiciune de fraudă). În acest caz îți returnăm integral suma plătită.
        </p>
      </LegalSection>

      <LegalSection id="plata" title="6. Plata">
        <p>
          Plățile sunt procesate de Stripe, un procesator de plăți autorizat. Poți plăti cu cardul sau cu alte metode
          afișate pe pagina Stripe (de exemplu Apple Pay sau Google Pay). Noi nu vedem și nu stocăm datele complete ale
          cardului tău.
        </p>
        <p>
          Plata se face în lei. Dacă cardul tău este în altă monedă, banca ta sau Stripe pot aplica un curs de schimb și
          eventuale comisioane de conversie, afișate pe pagina de plată. Documentul fiscal pentru plată ți se transmite pe
          email, potrivit legii.
        </p>
      </LegalSection>

      <LegalSection id="abonamente" title="7. Abonamentele">
        <h3>7.1. Un plic (o lună)</h3>
        <p>Primești o singură ediție — cea a lunii următoare — fără nicio plată ulterioară.</p>

        <h3>7.2. Abonament de 12 luni, plată integrală</h3>
        <p>
          Plătești 660 lei o singură dată și primești 12 ediții consecutive, începând cu ediția lunii următoare. Abonamentul
          se încheie automat după a douăsprezecea ediție și nu se reînnoiește.
        </p>

        <h3>7.3. Abonament de 12 luni, plată lunară (plată recurentă)</h3>
        <ul>
          <li>
            Plătești 55 lei pe lună. Prima plată se face la comandă, iar următoarele sunt retrase automat de pe același
            card, lunar, la aceeași dată a lunii.
          </li>
          <li>
            Prin alegerea acestei variante ești de acord cu plățile automate lunare. Abonamentul cuprinde 12 plăți și 12
            ediții și se încheie automat după a douăsprezecea plată.
          </li>
          <li>
            <b>Poți anula oricând</b>, fără penalități, scriindu-ne la <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>{' '}
            (sau din linkul de gestionare a abonamentului din emailurile Stripe, dacă este disponibil). Anularea oprește
            plățile viitoare; edițiile deja plătite îți sunt livrate. Pentru a opri o plată, anularea trebuie să ne
            ajungă înainte de data acelei plăți.
          </li>
          <li>
            Dacă o plată lunară nu reușește (de exemplu, card expirat), Stripe poate reîncerca plata în zilele următoare.
            Cât timp plata nu e făcută, ediția lunii respective nu se expediază; dacă plata nu reușește nici după
            reîncercări, abonamentul se poate închide automat.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="livrare" title="8. Livrarea">
        <ul>
          <li>Livrăm doar la adrese din România, prin servicii poștale (de regulă Poșta Română).</li>
          <li>
            Plicul fiecărei luni este expediat la finalul lunii precedente, ca să ajungă la tine la începutul lunii
            ediției. Comenzile plătite după expedierea unei ediții intră în următoarea expediere.
          </li>
          <li>
            Termenul de livrare depinde de serviciul poștal și este, de regulă, de câteva zile lucrătoare de la
            expediere. În orice caz, livrarea are loc în cel mult 30 de zile de la încheierea contractului pentru prima
            ediție, respectiv de la data expedierii pentru edițiile următoare.
          </li>
          <li>
            Dacă un plic nu ajunge în termen de 15 zile lucrătoare de la expediere, scrie-ne. Îl retrimitem sau, dacă
            preferi, îți returnăm contravaloarea ediției respective.
          </li>
          <li>
            Dacă plicul se întoarce la noi din cauza unei adrese greșite sau incomplete comunicate de tine, îl putem
            retrimite după ce ne confirmi adresa corectă.
          </li>
          <li>Riscul de pierdere sau deteriorare trece asupra ta în momentul în care primești plicul.</li>
        </ul>
      </LegalSection>

      <LegalSection id="retragere" title="9. Dreptul de retragere">
        <p>
          Ai dreptul să te retragi din contract în termen de <b>14 zile</b>, fără să dai vreun motiv și fără costuri, cu
          excepția costului de returnare a plicurilor deja primite. Pentru abonamente (livrări regulate pe o perioadă
          determinată), termenul de 14 zile curge de la data la care tu sau o persoană indicată de tine (alta decât
          transportatorul) intrați în posesia fizică a primului plic. Pentru plicul unic, termenul curge de la primirea
          lui.
        </p>
        <h3>Cum te retragi</h3>
        <p>Ne comunici decizia de retragere printr-o declarație neechivocă, în oricare dintre aceste moduri:</p>
        <ul>
          <li>
            folosind funcția online <Link href={WITHDRAWAL_HREF}>„Retrage-te din contract aici”</Link> — primești imediat
            un număr de înregistrare și, pe email, confirmarea de primire;
          </li>
          <li>
            prin email la <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, putând folosi formularul model din
            anexa de mai jos (nu este obligatoriu);
          </li>
          <li>prin poștă, la adresa sediului din secțiunea 1.</li>
        </ul>
        <p>
          Termenul este respectat dacă trimiți declarația înainte de expirarea celor 14 zile.
        </p>
        <h3>Ce se întâmplă după retragere</h3>
        <ul>
          <li>
            Îți returnăm toate sumele primite de la tine pentru contractul respectiv, inclusiv costul livrării, fără
            întârzieri nejustificate și în cel mult 14 zile de la data la care am fost informați despre decizia ta.
            Rambursarea se face prin aceeași metodă de plată pe care ai folosit-o, fără comisioane pentru tine.
          </li>
          <li>
            Dacă ai primit deja plicuri, te rugăm să ni le trimiți înapoi în cel mult 14 zile de la comunicarea retragerii.
            Costul direct al returnării este suportat de tine. Putem amâna rambursarea până primim plicurile înapoi sau
            până ne dovedești că le-ai trimis, oricare dintre aceste date este prima.
          </li>
          <li>
            Răspunzi doar pentru diminuarea valorii produselor rezultată din manipularea lor altfel decât este necesar
            pentru a le stabili natura și caracteristicile (de exemplu, un caiet deja completat).
          </li>
          <li>Retragerea dintr-un abonament cu plată lunară oprește și toate plățile viitoare.</li>
        </ul>
        <p>
          După expirarea termenului de retragere, abonamentul cu plată lunară poate fi oricând anulat pentru lunile
          viitoare, conform secțiunii 7.3.
        </p>
      </LegalSection>

      <LegalSection id="conformitate" title="10. Conformitatea produselor">
        <p>
          Răspundem pentru orice lipsă de conformitate a produselor existentă la momentul livrării și care devine
          evidentă în termen de doi ani de la livrare, potrivit Ordonanței de urgență a Guvernului nr. 140/2021. Dacă un
          plic ajunge deteriorat sau incomplet, scrie-ne (ideal cu o fotografie) și îl înlocuim sau, dacă înlocuirea nu
          este posibilă, îți returnăm contravaloarea ediției.
        </p>
      </LegalSection>

      <LegalSection id="donatie" title="11. Donația către adăpost">
        <p>
          Din fiecare plic vândut, 15 lei sunt donați de noi, din încasările Poșta Lunii, către Adăpostul Speranța.
          Donația este făcută de {COMPANY.shortName}, nu de tine, astfel că nu ți se emite un document de donație sau de
          sponsorizare și suma nu poate fi dedusă de tine. Prețul pe care îl plătești rămâne cel afișat. Dacă îți
          returnăm banii pentru un plic, donația aferentă acelui plic nu se mai datorează.
        </p>
      </LegalSection>

      <LegalSection id="proprietate" title="12. Proprietate intelectuală">
        <p>
          Textele, scrisorile, exercițiile, ilustrațiile și celelalte materiale din plicuri și de pe site aparțin autoarei
          Poșta Lunii sau sunt folosite cu acordul titularilor. Le poți folosi pentru uz personal. Nu le poți reproduce,
          vinde sau distribui public fără acordul nostru scris; poți, desigur, să le fotografiezi și să le arăți pe rețelele
          sociale, menționând Poșta Lunii.
        </p>
      </LegalSection>

      <LegalSection id="raspundere" title="13. Răspundere">
        <p>
          Răspundem pentru executarea corectă a contractului, potrivit legii. Nu răspundem pentru întârzieri sau
          neexecutări cauzate de forță majoră ori de evenimente pe care nu le putem controla (de exemplu, perturbări
          majore ale serviciilor poștale); în astfel de situații te anunțăm și îți propunem retrimiterea ediției sau
          returnarea banilor. Nimic din acești termeni nu limitează drepturile pe care legea ți le acordă ca
          consumator.
        </p>
      </LegalSection>

      <LegalSection id="date" title="14. Datele personale">
        <p>
          Folosim datele tale doar pentru a-ți livra plicurile, a încasa plata și a respecta obligațiile legale. Toate
          detaliile sunt în <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>, iar despre
          cookie-uri poți citi în <Link href="/politica-cookies">Politica de cookie-uri</Link>.
        </p>
      </LegalSection>

      <LegalSection id="reclamatii" title="15. Reclamații și soluționarea litigiilor">
        <p>
          Pentru orice problemă, scrie-ne la <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Îți răspundem cât
          mai repede, în cel mult 30 de zile calendaristice.
        </p>
        <p>
          Dacă nu ajungem la o înțelegere, te poți adresa Autorității Naționale pentru Protecția Consumatorilor (
          <a href={ANPC.home} target="_blank" rel="noopener">
            anpc.ro
          </a>
          ) sau poți folosi procedura de soluționare alternativă a litigiilor (
          <a href={ANPC.sal} target="_blank" rel="noopener">
            SAL — anpc.ro/ce-este-sal
          </a>
          ). Litigiile care nu se rezolvă pe cale amiabilă sunt de competența instanțelor din România; ca consumator, te
          poți adresa și instanței de la domiciliul tău.
        </p>
      </LegalSection>

      <LegalSection id="modificari" title="16. Modificarea termenilor și legea aplicabilă">
        <p>
          Putem actualiza acești termeni (de exemplu, la schimbări legislative sau ale ofertei). Versiunea nouă se aplică
          comenzilor plasate după publicare. Dacă o modificare afectează un abonament în curs, te anunțăm pe email cu cel
          puțin 30 de zile înainte, iar dacă nu ești de acord poți anula abonamentul fără costuri.
        </p>
        <p>
          Contractul este guvernat de legea română, inclusiv de Ordonanța de urgență a Guvernului nr. 34/2014 privind
          drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii. Contractul se încheie în limba
          română.
        </p>
      </LegalSection>

      <LegalSection id="formular" title="Anexă — Formular de retragere">
        <p className="pl-muted">
          Completează și trimite acest formular doar dacă dorești să te retragi din contract. Cel mai simplu este să
          folosești funcția online <Link href={WITHDRAWAL_HREF}>„Retrage-te din contract aici”</Link>.
        </p>
        <div className="pl-legal__form-model">
          <p>
            Către: {COMPANY.name}, {COMPANY.address}, email: {COMPANY.email}
          </p>
          <p>
            Vă informez prin prezenta cu privire la retragerea mea din contractul de vânzare a următoarelor produse:
            ____________________
          </p>
          <p>Comandate la data: ____________ / primite la data: ____________</p>
          <p>Numele consumatorului: ____________________</p>
          <p>Adresa consumatorului: ____________________</p>
          <p>Semnătura consumatorului (doar dacă formularul este trimis pe hârtie): ____________</p>
          <p>Data: ____________</p>
        </div>
      </LegalSection>
    </LegalPage>
  )
}
