import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353144/BOX36_sj5y11.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353144/BOX1_ej79yh.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353145/BOX6_ysc30r.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353145/BOX3_n8kszw.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353146/BOX4_hxzejn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353147/BOX5_jot45s.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353148/BOX11_lofnch.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353150/BOX14_utbro7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353151/BOX13_u6umzu.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353151/BOX15_y2rywm.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353151/BOX12_tlutke.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353153/BOX19_uw6clh.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353153/BOX16_otggry.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353152/BOX18_c85fss.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353153/BOX7_pkssgl.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353156/BOX22_ukorru.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353153/BOX20_yyjwlr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353156/BOX23_aqueb4.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353157/BOX26_pntstt.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353156/BOX21_f46rsh.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353158/BOX29_vjs97v.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353157/BOX25_v99tlr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353166/BOX31_eswpxl.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353160/BOX33_vjib8x.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353162/BOX35_cpa4bf.jpg"
];

export function Box({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Box Aranžmani"
      description="Moderne i luksuzne cvjetne kutije (flower box). Elegantan način da iskažete pažnju i stil."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
