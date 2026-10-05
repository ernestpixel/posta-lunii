import type { CollectionConfig } from 'payload'

/**
 * Declarațiile de retragere din contract trimise prin formularul de pe site
 * (`/retragere`). Se creează doar din server action, cu `overrideAccess`; din
 * admin se pot doar citi și marca drept procesate — conținutul declarației
 * rămâne așa cum l-a trimis clientul.
 */
export const Withdrawals: CollectionConfig = {
  slug: 'withdrawals',
  labels: { singular: 'Retragere din contract', plural: 'Retrageri din contract' },
  admin: {
    useAsTitle: 'reference',
    group: 'Comenzi',
    defaultColumns: ['reference', 'name', 'email', 'status', 'createdAt'],
    description:
      'Declarații trimise prin funcția „Retrage-te din contract aici”. Rambursarea se face în cel mult 14 zile de la primire.',
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: () => false,
  },
  fields: [
    { name: 'reference', type: 'text', label: 'Număr de înregistrare', required: true, unique: true, admin: { readOnly: true } },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Nume', required: true, admin: { readOnly: true, width: '50%' } },
        { name: 'email', type: 'email', label: 'Email', required: true, admin: { readOnly: true, width: '50%' } },
      ],
    },
    {
      name: 'product',
      type: 'select',
      label: 'Produs',
      required: true,
      admin: { readOnly: true },
      options: [
        { label: 'Un plic (o lună)', value: 'single' },
        { label: 'Abonament 12 luni – plată lunară', value: 'monthly' },
        { label: 'Abonament 12 luni – plată integrală', value: 'annual' },
      ],
    },
    { name: 'contract', type: 'textarea', label: 'Identificarea comenzii', required: true, admin: { readOnly: true } },
    { name: 'address', type: 'textarea', label: 'Adresa de livrare', admin: { readOnly: true } },
    { name: 'message', type: 'textarea', label: 'Mențiuni', admin: { readOnly: true } },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          label: 'Stare',
          defaultValue: 'new',
          admin: { width: '50%' },
          options: [
            { label: 'Nouă', value: 'new' },
            { label: 'În lucru', value: 'processing' },
            { label: 'Rambursată', value: 'refunded' },
            { label: 'Închisă', value: 'closed' },
          ],
        },
        {
          name: 'acknowledgementSent',
          type: 'checkbox',
          label: 'Confirmare trimisă pe email',
          admin: { readOnly: true, width: '50%' },
        },
      ],
    },
    { name: 'notes', type: 'textarea', label: 'Note interne' },
  ],
}
