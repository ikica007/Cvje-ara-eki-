import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/BOX36_sj5y11.jpg",
  "/images/BOX1_ej79yh.jpg",
  "/images/BOX6_ysc30r.jpg",
  "/images/BOX3_n8kszw.jpg",
  "/images/BOX4_hxzejn.jpg",
  "/images/BOX5_jot45s.jpg",
  "/images/BOX11_lofnch.jpg",
  "/images/BOX14_utbro7.jpg",
  "/images/BOX13_u6umzu.jpg",
  "/images/BOX15_y2rywm.jpg",
  "/images/BOX12_tlutke.jpg",
  "/images/BOX19_uw6clh.jpg",
  "/images/BOX16_otggry.jpg",
  "/images/BOX18_c85fss.jpg",
  "/images/BOX7_pkssgl.jpg",
  "/images/BOX22_ukorru.jpg",
  "/images/BOX20_yyjwlr.jpg",
  "/images/BOX23_aqueb4.jpg",
  "/images/BOX26_pntstt.jpg",
  "/images/BOX21_f46rsh.jpg",
  "/images/BOX29_vjs97v.jpg",
  "/images/BOX25_v99tlr.jpg",
  "/images/BOX31_eswpxl.jpg",
  "/images/BOX33_vjib8x.jpg",
  "/images/BOX35_cpa4bf.jpg",
  "/images/IMG_4667_khwx78.jpg",
  "/images/1781721814881463_ae843f22-066e-4c2b-8888-330383bb8ee8_bumbp5.jpg",
  "/images/1781619472677574_d448d401-30f6-4434-a55f-fcaa22cff9b7_d7tefk.jpg",
  "/images/IMG_4720_vvcwud.jpg",
  "/images/IMG_2464_a5x5hd.jpg",
  "/images/IMG-20260603-WA0003_1_qv6qmm.jpg",
  "/images/1781721815544170_44b0a304-94b1-4b2e-bf27-2b64a01a5884_kjmwwr.jpg",
  "/images/1781721813236335_d5fd6bf2-7f67-40bb-8c8e-33465745f167_pjrots.jpg",
  "/images/IMG-20260604-WA0005_1_iwb3f8.jpg",
  "/images/1781721814445836_6d8aac36-6743-4417-8060-20eebeedd2d7_ybq6kt.jpg",
  "/images/1781721814632462_54ec0010-96c3-4f6a-8ec2-0c8a0469fa01_pzstur.jpg",
  "/images/1781526465908035_8fff623f-5cf9-4372-a3a2-0d5955c48c55_fhihpv.jpg",
  "/images/1781721812491669_baaf08dd-bd01-4ea5-8244-913940d72c79_maghnr.jpg",
  "/images/1779892457433496_349a43dc-97ad-4e63-b7d3-ecd70d7bb494_mi7x8d.jpg",
  "/images/1781280491197458_cdd919f7-6dc2-41dc-ab3b-edde2477caca_w9fyz0.jpg",
  "/images/1779259547956128_2cb28369-ee17-418e-a93e-f8e8f25e6020_a6g0xq.jpg",
  "/images/1777123229326808_4c3646cc-9c3f-44e3-9a56-7da2733dfe3c_oayai3.jpg",
  "/images/177702886547356_aa6adb10-6757-41cf-9806-f461a87b7471_zhojgc.jpg",
  "/images/177815893557937_7cee89f4-e880-46a5-9b94-973ad800270a_b2fcaw.jpg",
  "/images/1762001040137012_6b96e32a-21e0-454e-84c9-3d3e03af8cf6_p85bmz.jpg",
  "/images/1777291586859709_12e3fa32-d910-4fd3-966e-c9efdd1d9b48_gegnm0.jpg",
  "/images/177806101391137_5dfead16-c30d-4953-a9a5-e6393e139624_yvsqyb.jpg",
  "/images/20260616_181412_u6gorh.jpg",
  "/images/1781721816311365_55a0df54-bf82-48eb-9840-01375cb1cadd_mi8js8.jpg"
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
