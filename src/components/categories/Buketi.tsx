import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354838/buketi50_wwpmyk.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354838/buketi18_xwztxh.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354837/buketi17_ttjzou.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354835/buketi16_hvamai.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354834/buketi15_nvcurn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354834/buketi14_gwgayo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354832/buketi13_inb27z.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354831/buketi12_dficmr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354830/buketi10_bfiunv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354829/buketi9_w9ojvl.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354828/buketi8_rghpsy.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354827/buketi7_l21htf.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354826/buketi6_nbd6ec.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354826/buketi5_zexaer.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354824/buketi3_juremx.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354822/buketi51_kfptye.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354823/buketi2_pmi14s.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354823/buketi1_qr1ta5.jpg"
];

export function Buketi({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Buketi"
      description="Klasični, moderni i unikatni buketi za svaku priliku. Izrađeni s ljubavlju i pažnjom prema detaljima."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
