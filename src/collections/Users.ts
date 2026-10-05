import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administrare',
    defaultColumns: ['name', 'email', 'updatedAt'],
  },
  labels: { singular: 'Utilizator', plural: 'Utilizatori' },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nume',
    },
  ],
}
