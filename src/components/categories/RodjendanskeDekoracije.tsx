import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/731916683_4426958267621241_7455373223689981374_n_c2oaz5.jpg",
  "/images/734815831_4431057007211367_6900615340819648491_n_uwwbrg.jpg",
  "/images/729791029_4426958640954537_2002201964411750353_n_ykmcvk.jpg",
  "/images/719463360_4409531516030583_8761726392761659658_n_njk04i.jpg",
  "/images/713744991_4404580036525731_6532042859456968344_n_peme9g.jpg",
  "/images/670407993_4353302368320165_8238731698117836130_n_xty58f.jpg",
  "/images/665717241_4346460259004376_954715056274989287_n_eop9bm.jpg",
  "/images/735608450_4431056753878059_4067963403301221480_n_p9o9wo.jpg",
  "/images/718675127_4408401816143553_8622878852723129310_n_d4t152.jpg",
  "/images/659805797_4336340530016349_7869134873238539479_n_na0huf.jpg",
  "/images/641462455_4304694736514262_2795362519661947784_n_ipqckp.jpg",
  "/images/670407993_4353302368320165_8238731698117836130_n_lzg5fv.jpg",
  "/images/607172493_4252865098363893_6227588986096320600_n_b7rp5i.jpg",
  "/images/602001943_4247276635589406_5879903296388695358_n_t3p49i.jpg"
];

export function RodjendanskeDekoracije({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Rođendanske Dekoracije"
      description="Pretvorite svaki rođendan u bajku. Nudimo kompletne stilizovane dekoracije, tematske postavke i aranžmane po vašim željama."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
      hidePrices={true}
    />
  );
}
