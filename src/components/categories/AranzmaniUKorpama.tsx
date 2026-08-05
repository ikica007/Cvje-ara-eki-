import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
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
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991008/aranzmaniukorpama39_w6gz0c.jpg"
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
