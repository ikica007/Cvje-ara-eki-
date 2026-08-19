import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  // Originalnih 25 slika za koje postoje tacne cijene u prices.ts
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991026/aranzmaniukorpama35_oncgd7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991025/aranzmaniukorpama36_qbwnny.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991025/aranzmaniukorpama38_qsj5j6.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991025/aranzmaniukorpama34_mp6bul.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991025/aranzmaniukorpama37_rgqhuj.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991023/aranzmaniukorpama31_vi8fc6.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991023/aranzmaniukorpama29_h2y3wo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991023/aranzmaniukorpama32_wzgts1.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991020/aranzmaniukorpama26_t1j0nb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991020/aranzmaniukorpama27_m3gfye.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991019/aranzmaniukorpama21_v9veg8.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991017/aranzmaniukorpama20_coyhds.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991016/aranzmaniukorpama15_gwgxtx.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991016/aranzmaniukorpama17_dilfak.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991016/aranzmaniukorpama14_iakkh8.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991015/aranzmaniukorpama16_xjaipg.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991013/aranzmaniukorpama7_b58y1h.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991012/aranzmaniukorpama8_udnyz8.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991013/aranzmaniukorpama10_pazexn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991011/aranzmaniukorpama5_bx5nqt.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991011/aranzmaniukorpama4_yjytos.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991009/aranzmaniukorpama1_fvf2av.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991010/aranzmaniukorpama3_crhdcf.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991010/aranzmaniukorpama2_fqq7pk.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991008/aranzmaniukorpama39_w6gz0c.jpg",
  
  // Novi dodaci (slike koje su nedostajale) - one ce dobiti oznaku "Na upit"
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137964/aranzmaniukorpama6_a8g9zd.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137965/aranzmaniukorpama9_w7zjpy.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137966/aranzmaniukorpama11_x12fhb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137966/aranzmaniukorpama12_rcc3tl.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137967/aranzmaniukorpama13_kvklue.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137968/aranzmaniukorpama18_yvfmps.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137969/aranzmaniukorpama19_xz4ccp.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137969/aranzmaniukorpama22_uju5ro.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137969/aranzmaniukorpama23_merd5k.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137970/aranzmaniukorpama24_szlfgu.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137969/aranzmaniukorpama25_fnzbhv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137971/aranzmaniukorpama28_gv2x8t.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137971/aranzmaniukorpama30_gnr0fr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787137972/aranzmaniukorpama33_swyubk.jpg"
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
