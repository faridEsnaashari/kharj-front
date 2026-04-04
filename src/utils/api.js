export const BASEURL = import.meta.env.VITE_API_BASE_URL||`http://${document.URL.split("//")[1].split("/")[0]}`;

export const unitMapper = {
  rl:"RIAL",

  dl: 'DOLAR',
  eu:  'EUR',
  tlg: 'TALA_GERAM',
  tlr:'TALA_ROB',
};

export const bankMapper = {
  rs: 'RESALAT',
  bm: 'MELY',
  sp: 'SEPAH',
  ps: 'PASARGAD',
  bl: 'BLUE',
  mf: 'MOFID',
  bp: 'BITPIN',
  nb: 'NOBITEX',
  dg: 'DIGIPAY',
  gn:"GENERAL",
};

export const categoryMapper = {
  f: 'FOOD',
  gf: 'GYM_FOOD',
  s: 'SMOKE',
  h: 'HOME',
  c: 'COFFE',
  g: 'GYM',
  r: 'RENT',
  fr: 'FRUIT',
  l: 'LOAN',
  i: 'INTERNET',
  cm: 'COSMETICS',
  t: 'TRANSFER',
  cl: 'CLOTHES',
  ms: 'MS',
  n: 'NEMIDOONAM',
  cw: 'COWORK',
  bd: 'BEDEHI',
  hl: 'HALEHOOLE',
  b: 'BANK',
};

export const incomeCategoryMapper = {
  h: 'HOGHOOGH',
  ms: 'MOSAEDEH',
  bd: 'BEDEHI',
  vm: 'LOAN',
  sp: 'SNAPP',
  sm: "MS"
};

// Helper function to create option list from mappers
export const createSelectOptions = (mapper) => {
    return Object.entries(mapper).map(([, value]) => ({
        value: value,
        label: value,
    }));
};
