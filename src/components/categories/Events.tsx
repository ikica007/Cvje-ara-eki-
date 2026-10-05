import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/741144562_4438572556459812_5736133563559386323_n_xswgej.jpg",
  "/images/668449459_4349561692027566_2796621211269861166_n_tijix7.jpg",
  "/images/615860426_4264740180509718_9205209452316340789_n_mocmmm.jpg",
  "/images/586572997_4221277984855938_7208945827008094564_n_d3zr2l.jpg",
  "/images/598114945_4236375403346196_9023110036962165425_n_ujqpji.jpg",
  "/images/552384574_4152091911774546_1113858929313318824_n_zrknlt.jpg",
  "/images/600286512_4239986602985076_2355341454115226145_n_gkwm8j.jpg",
  "/images/522646976_4089731091343962_4011640397660161262_n_debvbn.jpg",
  "/images/520304208_4089733014677103_7060129752784406057_n_cy6bgq.jpg",
  "/images/523376445_4089730288010709_2436699149325399683_n_gz5ksv.jpg"
];

export function Events({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Events (Svečani Događaji)"
      description="Ekskluzivna cvjetna estetika i event styling za korporativne događaje, jubileje, gala večere i svečane manifestacije."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
      hidePrices={true}
    />
  );
}
