import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "/images/buketi_XL-XXXL29_izek68.jpg",
  "/images/buketi_XL-XXXL27_l0k8vs.jpg",
  "/images/buketi_XL-XXXL26_e7zmym.jpg",
  "/images/buketi_XL-XXXL25_e8jfwy.jpg",
  "/images/buketi_XL-XXXL24_itvwjo.jpg",
  "/images/buketi_XL-XXXL22_ovwvj1.jpg",
  "/images/buketi_XL-XXXL21_fmvdra.jpg",
  "/images/buketi_XL-XXXL20_avqfwn.jpg",
  "/images/buketi_XL-XXXL19_n5edv5.jpg",
  "/images/buketi_XL-XXXL18_atc73x.jpg",
  "/images/buketi_XL-XXXL17_p4ljs7.jpg",
  "/images/buketi_XL-XXXL16_y6kpvo.jpg",
  "/images/buketi_XL-XXXL15_lgydrv.jpg",
  "/images/buketi_XL-XXXL14_hqlgxx.jpg",
  "/images/buketi_XL-XXXL13_hih3nz.jpg",
  "/images/buketi_XL-XXXL12_rhzyni.jpg",
  "/images/buketi_XL-XXXL10_loe9et.jpg",
  "/images/buketi_XL-XXXL9_s4l4dg.jpg",
  "/images/buketi_XL-XXXL11_hkqg1i.jpg",
  "/images/buketi_XL-XXXL6_umug6a.jpg",
  "/images/buketi_XL-XXXL8_fxg16y.jpg",
  "/images/buketi_XL-XXXL5_vcjqsq.jpg",
  "/images/buketi_XL-XXXL4_iyf1fj.jpg",
  "/images/buketi_XL-XXXL2_v6yjsq.jpg",
  "/images/buketi_XL-XXXL30_arcrlf.jpg",
  "/images/buketi_XL-XXXL3_zap9ys.jpg",
  "/images/20251024_093619_a0lqsx.jpg",
  "/images/1782211626141721_b2828400-8b04-4e4d-84ad-824555e598fe_cqh6j4.jpg",
  "/images/20251213_105318_co8pir.jpg",
  "/images/20251219_095252_i7yb2x.jpg",
  "/images/20260103_103426_apomvv.jpg",
  "/images/20251225_113525_lb41qv.jpg",
  "/images/20251227_104656_j1ab64.jpg",
  "/images/20260103_142428_cbqcpx.jpg",
  "/images/20260105_100957_koktpn.jpg",
  "/images/20260116_160730_nzf6t7.jpg",
  "/images/20260109_160940_xoesq0.jpg",
  "/images/20260116_161109_pfjcrn.jpg",
  "/images/20260127_152320_xcjeoa.jpg",
  "/images/20260128_124357_r0oksa.jpg",
  "/images/20260116_160936_junmur.jpg",
  "/images/20260316_092053_c7y6fp.jpg",
  "/images/20260128_124425_vvenak.jpg",
  "/images/20260615_105724_1_shzn9g.jpg",
  "/images/20260328_131738_llfsue.jpg",
  "/images/176641021248223_d3e5c426-5403-4931-b6ba-bb7fe7b81921_tppuya.jpg",
  "/images/20260406_111523_rrfqcj.jpg",
  "/images/178179312922344_5f18fdff-bd23-4190-8779-5d96022de2ad_ldsvgb.jpg",
  "/images/20260406_145301_va8fie.jpg",
  "/images/1765805476180719_4558a4bc-e3a1-440c-ad7f-cf4ed0d94fae_mkhxv6.jpg",
  "/images/178134537221682_ba640aa7-364c-4de0-bab4-d0166c419af5_yzpyrn.jpg",
  "/images/1766411792514492_865ab87c-aa2b-40e5-acb8-17d4a5966146_kagcxl.jpg",
  "/images/1766410209577865_a78acb1e-23ea-4ca4-852e-9ad5f3caf337_agia4m.jpg",
  "/images/1766410210467151_c3ae05a1-0c12-44f3-ae43-c06f28652ee6_znexgd.jpg",
  "/images/1767441139296527_49528e5c-5b4c-4a0e-9eb9-8b2a9f3b4333_tsayp6.jpg",
  "/images/1768302338515233_9554fe14-2b7e-4d34-b38e-630610700f1c_nmnqh6.jpg",
  "/images/1767697861171122_94af361c-871b-4770-803e-5b91cd2adb7e_ukywbu.jpg",
  "/images/1768324944291060_c6315f9a-e62c-4a3d-a226-a4942661d365_x8gukw.jpg",
  "/images/1768479387269042_b869a323-c0e6-433d-8d32-89e43a39df15_hjrwc0.jpg",
  "/images/1768497402962924_ca5d2ecf-8bcc-47b1-8177-34cf46f60f7d_kwsthk.jpg",
  "/images/1768479388302158_3b0889a8-0fa0-4121-997a-599f82509d2a_swjof2.jpg",
  "/images/1768997120583313_0b1fd23b-63a2-47a5-a0aa-fd202484d976_mh5vzm.jpg",
  "/images/1768997118773941_ab8c3113-7ed0-4b91-a484-655c28e9ac9e_exelqo.jpg",
  "/images/1770477336902806_3f40e03b-510c-49cc-9ec4-1596cc2f468c_qqz65n.jpg",
  "/images/1769773246232916_9fcaba01-cf7f-404e-9461-aca8d2ddf9c3_hmgog3.jpg",
  "/images/1774687828180676_27a50d30-7851-421e-99e3-6b4b149c95f6_osnrjc.jpg",
  "/images/1770477339156281_5b8f3b10-91e3-4bb9-b52a-7d182fb364ec_k0461w.jpg",
  "/images/1777395795401225_6b974ebc-0b03-4bca-b2e8-f7e130e6ec00_t6de2j.jpg",
  "/images/1776944847385168_d7cef2fb-705e-4034-a2d6-b18e7ccbd7be_tbfwek.jpg",
  "/images/1779524966185543_980a3443-af1e-4174-a1b1-fc2d9c5944df_a49umc.jpg",
  "/images/1778829892482953_13ad2520-2d6d-4501-adf5-401b6716a9b1_adtz2e.jpg",
  "/images/1779792289142444_942c1621-7227-4696-9141-08731626b189_ojzwza.jpg",
  "/images/1779612334312368_5aa3259d-76a4-432f-88ac-888f04d8c192_t6uj2l.jpg",
  "/images/1780757387364464_44668471-5beb-4d55-add6-321d3a2e1c43_pjst9x.jpg",
  "/images/1781619470491557_1346670b-162b-4bf6-a62d-389cd71e4524_ewgpb9.jpg",
  "/images/1781619473593357_adbe1f33-24bc-4933-97a9-a977791f29ec_mhevn7.jpg",
  "/images/1781793124238223_e621d5f6-b73a-4f8c-be40-39f9f64be6a9_vgesek.jpg",
  "/images/1781619478338142_84d8ae51-58b3-43ba-af93-d165f9cc41a9_s1rqdr.jpg",
  "/images/1782211625423862_1f14c93e-8111-4b0c-b230-6e0772103b9a_mmg3yo.jpg",
  "/images/1781871839725672_eda17e05-597e-4f19-96f3-6500f4596007_kkhyra.jpg",
  "/images/IMG_4730_z5wweo.jpg",
  "/images/IMG-35dc714f0a470ca1722c86ec6eb5c082-V_amup4h.jpg",
  "/images/IMG_4733_ymb07t.jpg",
  "/images/IMG-20260605-WA0000_cchxap.jpg"
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
