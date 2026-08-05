import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905378/svadbene_dekoracije26_amlk9v.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905387/svadbene_dekoracije52_szzttj.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905380/svadbene_dekoracije1_eq6ioa.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905380/svadbene_dekoracije2_wmvxmf.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905380/svadbene_dekoracije50_web9qo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905379/svadbene_dekoracije51_hkib6y.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905378/svadbene_dekoracije16_txwh0u.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905378/svadbene_dekoracije22_gwdjow.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905377/svadbene_dekoracije25_mxzz1p.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905377/svadbene_dekoracije23_wn4ntn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905376/svadbene_dekoracije18_r8qzmk.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905376/svadbene_dekoracije21_g2unwe.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905376/svadbene_dekoracije15_bsiwro.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905375/svadbene_dekoracije13_trsegk.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905374/svadbene_dekoracije3_ji3jzn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905374/svadbene_dekoracije12_rehym7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905374/svadbene_dekoracije11_ssjke9.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905373/svadbene_dekoracije6_l2dqhp.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905373/svadbene_dekoracije14_hccaf3.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905373/svadbene_dekoracije4_p6p3ei.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905371/svadbene_dekoracije8_ulxld6.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905369/svadbene_dekoracije7_dfoz8y.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905369/svadbene_dekoracije57_hswtwh.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905368/svadbene_dekoracije55_wsyjl0.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905368/svadbene_dekoracije54_m5c6nx.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905368/svadbene_dekoracije5_sumjq5.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905368/svadbene_dekoracije56_i68z4s.jpg"
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
