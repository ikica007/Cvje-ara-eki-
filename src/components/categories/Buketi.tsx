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
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354823/buketi1_qr1ta5.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049720/buketi68_itvsvc.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049722/buketi51_rcdutt.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049723/buketi50_zibwfb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049725/buketi54_nmfonc.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049726/buketi55_sxbf4b.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049726/buketi56_ky9w6t.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049726/buketi52_hwzmzf.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049727/buketi53_plof4r.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049729/buketi60_xpddbl.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049729/buketi57_vrlflv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049729/buketi59_yd8spp.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049730/buketi58_yqnmro.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049731/buketi61_idpe90.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049732/buketi63_nsh1oq.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049732/buketi62_kiqvba.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049733/buketi65_h2wbam.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049736/buketi67_fawzta.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787049734/buketi66_m3vuxa.jpg"
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
