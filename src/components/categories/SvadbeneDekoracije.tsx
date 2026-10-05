import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/svadbene_dekoracije26_amlk9v.jpg",
  "/images/svadbene_dekoracije52_szzttj.jpg",
  "/images/svadbene_dekoracije1_eq6ioa.jpg",
  "/images/svadbene_dekoracije2_wmvxmf.jpg",
  "/images/svadbene_dekoracije50_web9qo.jpg",
  "/images/svadbene_dekoracije51_hkib6y.jpg",
  "/images/svadbene_dekoracije16_txwh0u.jpg",
  "/images/svadbene_dekoracije22_gwdjow.jpg",
  "/images/svadbene_dekoracije25_mxzz1p.jpg",
  "/images/svadbene_dekoracije23_wn4ntn.jpg",
  "/images/svadbene_dekoracije18_r8qzmk.jpg",
  "/images/svadbene_dekoracije21_g2unwe.jpg",
  "/images/svadbene_dekoracije15_bsiwro.jpg",
  "/images/svadbene_dekoracije13_trsegk.jpg",
  "/images/svadbene_dekoracije3_ji3jzn.jpg",
  "/images/svadbene_dekoracije12_rehym7.jpg",
  "/images/svadbene_dekoracije11_ssjke9.jpg",
  "/images/svadbene_dekoracije6_l2dqhp.jpg",
  "/images/svadbene_dekoracije14_hccaf3.jpg",
  "/images/svadbene_dekoracije4_p6p3ei.jpg",
  "/images/svadbene_dekoracije8_ulxld6.jpg",
  "/images/svadbene_dekoracije7_dfoz8y.jpg",
  "/images/svadbene_dekoracije57_hswtwh.jpg",
  "/images/svadbene_dekoracije55_wsyjl0.jpg",
  "/images/svadbene_dekoracije54_m5c6nx.jpg",
  "/images/svadbene_dekoracije5_sumjq5.jpg",
  "/images/svadbene_dekoracije56_i68z4s.jpg"
];

export function SvadbeneDekoracije({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Svadbene Dekoracije"
      description="Učinite vaš poseban dan nezaboravnim uz naše jedinstvene svadbene dekoracije. Pažljivo birano cvijeće, stilizovani stolovi, lukovi i cvjetni zidovi kreirani po vašoj želji i viziji."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
      hidePrices={true}
    />
  );
}
