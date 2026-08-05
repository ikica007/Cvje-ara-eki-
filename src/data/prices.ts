export interface PriceData {
  price: number;
  suffix?: string;
}

export const CATEGORY_PRICES: Record<string, PriceData[]> = {
  "XL-XXXL Buketi": [
    { price: 75 }, { price: 60 }, { price: 70 }, { price: 90 }, { price: 60 },
    { price: 150 }, { price: 80 }, { price: 70 }, { price: 75 }, { price: 75 },
    { price: 120 }, { price: 50 }, { price: 60 }, { price: 90 }, { price: 50 },
    { price: 70 }, { price: 90 }, { price: 115 }, { price: 80 }, { price: 110 },
    { price: 60 }, { price: 90 }, { price: 60 }, { price: 90 }, { price: 70 },
    { price: 60 }
  ],
  "Buketi": [
    { price: 15 }, { price: 15 }, { price: 40 }, { price: 45 }, { price: 50 },
    { price: 90 }, { price: 45 }, { price: 85 }, { price: 30 }, { price: 40 },
    { price: 35 }, { price: 35 }, { price: 40 }, { price: 40 }, { price: 35 },
    { price: 35 }, { price: 50 }, { price: 25 }
  ],
  "Aranžmani u Korpama": [
    { price: 40 }, { price: 45 }, { price: 15 }, { price: 25 }, { price: 25 },
    { price: 80, suffix: "(komad)" }, { price: 70 }, { price: 130 }, { price: 45 }, { price: 75 },
    { price: 35, suffix: "(korpa)" }, { price: 35 }, { price: 40 }, { price: 45 }, { price: 75 },
    { price: 30 }, { price: 55 }, { price: 60 }, { price: 30 }, { price: 65 },
    { price: 50 }, { price: 35 }, { price: 90 }, { price: 80 }, { price: 30 }
  ],
  "Box Aranžmani": [
    { price: 70 }, { price: 28 }, { price: 25 }, { price: 65 }, { price: 95 },
    { price: 50 }, { price: 45 }, { price: 60 }, { price: 35 }, { price: 65, suffix: "Set (1+1)" },
    { price: 110, suffix: "Set (1+1)" }, { price: 45 }, { price: 65 }, { price: 30 }, { price: 40, suffix: "Set (1+1)" },
    { price: 110 }, { price: 60 }, { price: 50 }, { price: 30 }, { price: 60 },
    { price: 70 }, { price: 50 }, { price: 45 }, { price: 28 }, { price: 45 }
  ],
  "Aranžmani 101 Ruža": [
    { price: 260 }, { price: 360, suffix: "Set 101" }, { price: 260 }, { price: 260 }, { price: 270 },
    { price: 260 }, { price: 275 }, { price: 400, suffix: "(plišana kutija)" }, { price: 310 }, { price: 290 },
    { price: 260 }, { price: 320 }, { price: 320 }, { price: 370, suffix: "(plišana kutija)" }, { price: 330 },
    { price: 260 }
  ],
  "Slatki Aranžmani": [
    { price: 60 }, { price: 65, suffix: "(Set)" }, { price: 45 }, { price: 45 }, { price: 50 },
    { price: 50 }, { price: 40 }, { price: 45 }, { price: 60 }, { price: 55 },
    { price: 65 }, { price: 50 }, { price: 45 }, { price: 50 }
  ],
  "Kinder Aranžmani": [
    { price: 30 }, { price: 65 }, { price: 20 }, { price: 45 }, { price: 45 },
    { price: 100 }, { price: 65 }, { price: 40 }, { price: 45 }, { price: 85 },
    { price: 25, suffix: "(Komad)" }, { price: 25 }, { price: 35 }, { price: 60 }, { price: 65 },
    { price: 40 }, { price: 30 }, { price: 40 }
  ]
};
