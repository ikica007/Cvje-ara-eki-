import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/20250913_093906_sc3vuy.jpg",
  "/images/1773157895297919_5991dd52-c4ec-4e6d-83b4-06ab3da73505_ezq6r3.jpg",
  "/images/20250622_112952_fni3dr.jpg",
  "/images/Screenshot_20250403_145830_Instagram_ilnikx.jpg",
  "/images/IMG_4243_jbnlcu.jpg",
  "/images/1779729335926555_485e8cb4-ed03-413f-994a-733adbc895dd_ijbywg.jpg",
  "/images/1776926501116441_0a62c49f-e391-41ed-948f-10aa8543fc89_j8y55t.jpg",
  "/images/1766919353659440_febc1aae-beff-4bc6-9e21-6c04a52b2b76_mubmwm.jpg",
  "/images/176095742460666_651e7542-4fd7-4dfe-8af4-2c907450e124_lqpfqw.jpg",
  "/images/20251204_151809_thoil7.jpg",
  "/images/20251127_132910_p8scnk.jpg",
  "/images/20251002_170034_dtrjst.jpg",
  "/images/20250621_170749_xnpeil.jpg",
  "/images/20250314_114823_erk51o.jpg",
  "/images/20250312_145259_qdxclt.jpg",
  "/images/1776926505558480_90616993-2e64-4e2c-a12b-b52205cb324b_ia2ptv.jpg",
  "/images/17684943482563_649444f9-5a0f-4f64-bcd5-2f4dfa858ab1_ogveey.jpg"
];

export function Aranzmani101Ruza({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Aranžmani 101 Ruža"
      description="Raskoš, ljubav i elegancija u jednom. Spektakularni buketi i aranžmani od 101 ruže za one najposebnije."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
