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
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353162/BOX35_cpa4bf.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048650/IMG_4667_khwx78.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048649/1781721814881463_ae843f22-066e-4c2b-8888-330383bb8ee8_bumbp5.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048649/1781619472677574_d448d401-30f6-4434-a55f-fcaa22cff9b7_d7tefk.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048648/IMG_4720_vvcwud.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048648/IMG_2464_a5x5hd.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048648/IMG-20260603-WA0003_1_qv6qmm.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048647/1781721815544170_44b0a304-94b1-4b2e-bf27-2b64a01a5884_kjmwwr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048647/1781721813236335_d5fd6bf2-7f67-40bb-8c8e-33465745f167_pjrots.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048647/IMG-20260604-WA0005_1_iwb3f8.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048646/1781721814445836_6d8aac36-6743-4417-8060-20eebeedd2d7_ybq6kt.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048646/1781721814632462_54ec0010-96c3-4f6a-8ec2-0c8a0469fa01_pzstur.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048645/1781526465908035_8fff623f-5cf9-4372-a3a2-0d5955c48c55_fhihpv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048645/1781721812491669_baaf08dd-bd01-4ea5-8244-913940d72c79_maghnr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048645/1779892457433496_349a43dc-97ad-4e63-b7d3-ecd70d7bb494_mi7x8d.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048644/1781280491197458_cdd919f7-6dc2-41dc-ab3b-edde2477caca_w9fyz0.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048644/1779259547956128_2cb28369-ee17-418e-a93e-f8e8f25e6020_a6g0xq.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048643/1777123229326808_4c3646cc-9c3f-44e3-9a56-7da2733dfe3c_oayai3.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048643/177702886547356_aa6adb10-6757-41cf-9806-f461a87b7471_zhojgc.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048642/177815893557937_7cee89f4-e880-46a5-9b94-973ad800270a_b2fcaw.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048642/1762001040137012_6b96e32a-21e0-454e-84c9-3d3e03af8cf6_p85bmz.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048642/1777291586859709_12e3fa32-d910-4fd3-966e-c9efdd1d9b48_gegnm0.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048641/177806101391137_5dfead16-c30d-4953-a9a5-e6393e139624_yvsqyb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048640/20260616_181412_u6gorh.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787048639/1781721816311365_55a0df54-bf82-48eb-9840-01375cb1cadd_mi8js8.jpg"
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
