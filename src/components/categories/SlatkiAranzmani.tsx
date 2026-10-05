import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/720950320_4412874625696272_3790247440614940276_n_hu1cxh.jpg",
  "/images/588737074_4215360122114391_3870409484080912364_n_z36dyn.jpg",
  "/images/516696871_4079354005715004_2913456470690822567_n_zhlfws.jpg",
  "/images/514517944_4070395216610883_7679488160219081152_n_pmwqzl.jpg",
  "/images/506055311_4050938738556531_4160980134807420906_n_oqfyeo.jpg",
  "/images/506053277_4050938841889854_4397200449118973914_n_abbfth.jpg",
  "/images/506050483_4050938831889855_5058356587764052670_n_d7qjxa.jpg",
  "/images/505995620_4050938668556538_3240893623104851353_n_s7o2j4.jpg",
  "/images/505995363_4050940375223034_5816948780916468793_n_gwhz8o.jpg",
  "/images/505994319_4050938718556533_1758925001861024384_n_ilw72a.jpg",
  "/images/505882539_4050938535223218_5368514069202313071_n_mobzxm.jpg",
  "/images/505767740_4050938751889863_7396346761565284254_n_syh9si.jpg",
  "/images/505704500_4050938581889880_7448215555167504044_n_rjxtep.jpg",
  "/images/506056834_4050938605223211_285173982220119421_n_eub3ii.jpg"
];

export function SlatkiAranzmani({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Slatki Aranžmani"
      description="Savršen spoj najljepšeg cvijeća i vaših omiljenih slatkiša. Poklon koji osvaja sva čula."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
