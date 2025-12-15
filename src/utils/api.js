export const BASEURL = import.meta.env.VITE_API_BASE_URL||"http://localhost:3005";

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
};

export const incomeCategoryMapper = {
  h: 'HOGHOOGH',
  ms: 'MOSAEDEH',
  bd: 'BEDEHI',
  vm: 'LOAN',
  sp: 'SNAPP',
};

// Helper function to create option list from mappers
export const createSelectOptions = (mapper) => {
    return Object.entries(mapper).map(([key, value]) => ({
        value: value,
        label: value,
    }));
};
