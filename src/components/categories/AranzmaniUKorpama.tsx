import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  // Originalnih 25 slika za koje postoje tacne cijene u prices.ts
  "/images/aranzmaniukorpama35_oncgd7.jpg",
  "/images/aranzmaniukorpama36_qbwnny.jpg",
  "/images/aranzmaniukorpama38_qsj5j6.jpg",
  "/images/aranzmaniukorpama34_mp6bul.jpg",
  "/images/aranzmaniukorpama37_rgqhuj.jpg",
  "/images/aranzmaniukorpama31_vi8fc6.jpg",
  "/images/aranzmaniukorpama29_h2y3wo.jpg",
  "/images/aranzmaniukorpama32_wzgts1.jpg",
  "/images/aranzmaniukorpama26_t1j0nb.jpg",
  "/images/aranzmaniukorpama27_m3gfye.jpg",
  "/images/aranzmaniukorpama21_v9veg8.jpg",
  "/images/aranzmaniukorpama20_coyhds.jpg",
  "/images/aranzmaniukorpama15_gwgxtx.jpg",
  "/images/aranzmaniukorpama17_dilfak.jpg",
  "/images/aranzmaniukorpama14_iakkh8.jpg",
  "/images/aranzmaniukorpama16_xjaipg.jpg",
  "/images/aranzmaniukorpama7_b58y1h.jpg",
  "/images/aranzmaniukorpama8_udnyz8.jpg",
  "/images/aranzmaniukorpama10_pazexn.jpg",
  "/images/aranzmaniukorpama5_bx5nqt.jpg",
  "/images/aranzmaniukorpama4_yjytos.jpg",
  "/images/aranzmaniukorpama1_fvf2av.jpg",
  "/images/aranzmaniukorpama3_crhdcf.jpg",
  "/images/aranzmaniukorpama2_fqq7pk.jpg",
  "/images/aranzmaniukorpama39_w6gz0c.jpg",
  
  // Novi dodaci (slike koje su nedostajale) - one ce dobiti oznaku "Na upit"
  "/images/aranzmaniukorpama6_a8g9zd.jpg",
  "/images/aranzmaniukorpama9_w7zjpy.jpg",
  "/images/aranzmaniukorpama11_x12fhb.jpg",
  "/images/aranzmaniukorpama12_rcc3tl.jpg",
  "/images/aranzmaniukorpama13_kvklue.jpg",
  "/images/aranzmaniukorpama18_yvfmps.jpg",
  "/images/aranzmaniukorpama19_xz4ccp.jpg",
  "/images/aranzmaniukorpama22_uju5ro.jpg",
  "/images/aranzmaniukorpama23_merd5k.jpg",
  "/images/aranzmaniukorpama24_szlfgu.jpg",
  "/images/aranzmaniukorpama25_fnzbhv.jpg",
  "/images/aranzmaniukorpama28_gv2x8t.jpg",
  "/images/aranzmaniukorpama30_gnr0fr.jpg",
  "/images/aranzmaniukorpama33_swyubk.jpg"
];

export function AranzmaniUKorpama({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Aranžmani u Korpama"
      description="Predivni cvjetni aranžmani složeni u elegantne pletene korpe. Savršen poklon koji donosi toplinu i osmijeh."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
