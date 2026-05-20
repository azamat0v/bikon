import type { Core } from '@strapi/strapi';

const config = (_env: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'ru', 'uz'],
    },
  },
  localazy: {
    enabled: true,
    config: {
      projectToken:  process.env.LOCALAZY_READ_KEY  ?? '',
      readApiKey:    process.env.LOCALAZY_READ_KEY  ?? '',
      writeApiKey:   process.env.LOCALAZY_WRITE_KEY ?? '',
      filesPattern:  '{contentType}/{locale}.json',
    },
  },
});

export default config;
