import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/buketi50_wwpmyk.jpg",
  "/images/buketi18_xwztxh.jpg",
  "/images/buketi17_ttjzou.jpg",
  "/images/buketi16_hvamai.jpg",
  "/images/buketi15_nvcurn.jpg",
  "/images/buketi14_gwgayo.jpg",
  "/images/buketi13_inb27z.jpg",
  "/images/buketi12_dficmr.jpg",
  "/images/buketi10_bfiunv.jpg",
  "/images/buketi9_w9ojvl.jpg",
  "/images/buketi8_rghpsy.jpg",
  "/images/buketi7_l21htf.jpg",
  "/images/buketi6_nbd6ec.jpg",
  "/images/buketi5_zexaer.jpg",
  "/images/buketi3_juremx.jpg",
  "/images/buketi51_kfptye.jpg",
  "/images/buketi2_pmi14s.jpg",
  "/images/buketi1_qr1ta5.jpg",
  "/images/buketi68_itvsvc.jpg",
  "/images/buketi51_rcdutt.jpg",
  "/images/buketi50_zibwfb.jpg",
  "/images/buketi54_nmfonc.jpg",
  "/images/buketi55_sxbf4b.jpg",
  "/images/buketi56_ky9w6t.jpg",
  "/images/buketi52_hwzmzf.jpg",
  "/images/buketi53_plof4r.jpg",
  "/images/buketi60_xpddbl.jpg",
  "/images/buketi57_vrlflv.jpg",
  "/images/buketi59_yd8spp.jpg",
  "/images/buketi58_yqnmro.jpg",
  "/images/buketi61_idpe90.jpg",
  "/images/buketi63_nsh1oq.jpg",
  "/images/buketi62_kiqvba.jpg",
  "/images/buketi65_h2wbam.jpg",
  "/images/buketi67_fawzta.jpg",
  "/images/buketi66_m3vuxa.jpg"
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
