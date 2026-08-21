export interface PriceData {
  price: number;
  suffix?: string;
}

const p = (price: number, suffix?: string): PriceData => ({ price, suffix });

export const CATEGORY_PRICES: Record<string, PriceData[]> = {
  "XL-XXXL Buketi": [
    // Stare cijene
    75, 60, 70, 90, 60, 150, 80, 70, 75, 75, 120, 50, 60, 90, 50, 70, 90, 115, 80, 110,
    60, 90, 60, 90, 70, 60,
    // Nove cijene (od 27 pa nadalje)
    90, 120, 70, 70, 60, 70, 60, 70, 60, 75, 65, 60, 55, 65, 65, 100, 60, 60, 90, 60,
    100, 80, 80, 60, 90, 55, 50, 65, 70, 70, 160, 165, 55, 165, 50, 50, 120, 60, 85,
    110, 65, 110, 60, 110, 100, 160, 70, 65, 65, 60, 90, 50, 70, 120, 70, 115, 50, 65
  ].map(n => p(n)),

  "Buketi": [
    // Stare cijene
    15, 15, 40, 45, 50, 90, 45, 85, 30, 40, 35, 35, 40, 40, 35, 35, 50, 25,
    // Nove cijene (od 19 pa nadalje)
    50, 35, 18, 35, 40, 40, 40, 45, 40, 45, 65, 55, 75, 50, 60, 40, 35, 35
  ].map(n => p(n)),

  "Aranžmani u Korpama": [
    p(40), p(45), p(15), p(25), p(25),
    p(80, "(komad)"), p(70), p(130), p(45), p(75),
    p(35, "(korpa)"), p(35), p(40), p(45), p(75),
    p(30), p(55), p(60), p(30), p(65),
    p(50), p(35), p(90), p(80), p(30)
  ],

  "Box Aranžmani": [
    // Stare cijene (obrisana 37)
    p(70), p(28), p(25), p(65), p(95),
    p(50), p(45), p(60), p(35), p(65, "Set (1+1)"),
    p(110, "Set (1+1)"), p(45), p(65), p(30), p(40, "Set (1+1)"),
    p(110), p(60), p(50), p(30), p(60),
    p(70), p(50), p(45), p(28), p(45),
    // Nove cijene (od 26 pa nadalje)
    p(60), p(45), p(100), p(110), p(55),
    p(30), p(35), p(40), p(40), p(50),
    p(40), p(60), p(40), p(45), p(50),
    p(100), p(45), p(65), p(35, "+ poklon po želji"), p(70),
    p(45), p(90), p(45), p(45)
  ],

  "Aranžmani 101 Ruža": [
    p(260), p(360, "Set 101"), p(260), p(260), p(270),
    p(260), p(275), p(400, "(plišana kutija)"), p(310), p(290),
    p(260), p(320), p(320), p(370, "(plišana kutija)"), p(330),
    p(260)
  ],

  "Slatki Aranžmani": [
    p(60), p(65, "(Set)"), p(45), p(45), p(50),
    p(50), p(40), p(45), p(60), p(55),
    p(65), p(50), p(45), p(50)
  ],

  "Kinder Aranžmani": [
    p(30), p(65), p(20), p(45), p(45),
    p(100), p(65), p(40), p(45), p(85),
    p(25, "(Komad)"), p(25), p(35), p(60), p(65),
    p(40), p(30), p(40)
  ]
};
