// Only one item MUST have the "default: true" key

module.exports = {
  en: {
    default: true,
    path: `en`,
    locale: `en-US`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `en`,
    ogLanguage: `en_US`,
    defaultTitle: `Gatsby Starter with multi-language and CMS`,
    defaultDescription: `Gatsby example site using Markdown, i18n and CMS`,
  },
  tw: {
    path: `tw`,
    locale: `zh-TW`,
    dateFormat: `YYYY/MM/DD`,
    siteLanguage: `zh`,
    ogLanguage: `zh_TW`,
    defaultTitle: `茱麗 PRO 部落格`,
    defaultDescription: `學術 * 登山 * 生活`,
  },
}
