import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353839/buketi_XL-XXXL29_izek68.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353838/buketi_XL-XXXL27_l0k8vs.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353838/buketi_XL-XXXL26_e7zmym.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353836/buketi_XL-XXXL25_e8jfwy.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353835/buketi_XL-XXXL24_itvwjo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353834/buketi_XL-XXXL22_ovwvj1.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353833/buketi_XL-XXXL21_fmvdra.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353833/buketi_XL-XXXL20_avqfwn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353832/buketi_XL-XXXL19_n5edv5.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353831/buketi_XL-XXXL18_atc73x.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353830/buketi_XL-XXXL17_p4ljs7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353830/buketi_XL-XXXL16_y6kpvo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353829/buketi_XL-XXXL15_lgydrv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353828/buketi_XL-XXXL14_hqlgxx.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353827/buketi_XL-XXXL13_hih3nz.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353826/buketi_XL-XXXL12_rhzyni.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353826/buketi_XL-XXXL10_loe9et.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353825/buketi_XL-XXXL9_s4l4dg.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353825/buketi_XL-XXXL11_hkqg1i.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353824/buketi_XL-XXXL6_umug6a.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353823/buketi_XL-XXXL8_fxg16y.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353822/buketi_XL-XXXL5_vcjqsq.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353822/buketi_XL-XXXL4_iyf1fj.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353820/buketi_XL-XXXL2_v6yjsq.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353818/buketi_XL-XXXL30_arcrlf.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353820/buketi_XL-XXXL3_zap9ys.jpg"
];

export function XlXxxlBuketi({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="XL-XXXL Buketi"
      description="Impresivni i raskošni buketi velikih dimenzija za trenutke kada želite ostaviti bez daha."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
