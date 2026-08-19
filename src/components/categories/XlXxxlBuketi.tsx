import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  // Originalnih 26 slika za koje postoje tacne cijene u prices.ts
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992984/xl-xxxlbuketi30_y3v0vj.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992982/xl-xxxlbuketi28_voknff.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992981/xl-xxxlbuketi27_sryqio.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992980/xl-xxxlbuketi25_x92u6f.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992978/xl-xxxlbuketi26_ebmmy9.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992978/xl-xxxlbuketi24_qg5l8m.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992977/xl-xxxlbuketi23_c17k27.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992976/xl-xxxlbuketi22_wpsh5o.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992975/xl-xxxlbuketi20_n5weww.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992973/xl-xxxlbuketi19_zuvz84.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992972/xl-xxxlbuketi18_q28sw7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992971/xl-xxxlbuketi16_xebfwe.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992970/xl-xxxlbuketi17_e7m6ok.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992969/xl-xxxlbuketi15_k5dffl.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992968/xl-xxxlbuketi12_tpxooc.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992968/xl-xxxlbuketi13_o3w0y7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992966/xl-xxxlbuketi11_t2sckv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992965/xl-xxxlbuketi9_qisxok.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992964/xl-xxxlbuketi10_rrcrmx.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992962/xl-xxxlbuketi8_k2i8l7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992960/xl-xxxlbuketi6_yymz7u.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992959/xl-xxxlbuketi5_fztewt.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992957/xl-xxxlbuketi3_gxy6we.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992956/xl-xxxlbuketi2_r7fcf3.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992955/xl-xxxlbuketi1_zex92i.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1782992955/xl-xxxlbuketi29_oeyz89.jpg",
  
  // Novi dodaci (38 slika) - one ce dobiti oznaku "Na upit"
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139102/20251024_093619_a0lqsx.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139101/1782211626141721_b2828400-8b04-4e4d-84ad-824555e598fe_cqh6j4.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139103/20251213_105318_co8pir.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139103/20251219_095252_i7yb2x.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139104/20260103_103426_apomvv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139104/20251225_113525_lb41qv.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139105/20251227_104656_j1ab64.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139105/20260103_142428_cbqcpx.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139106/20260105_100957_koktpn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139108/20260116_160730_nzf6t7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139107/20260109_160940_xoesq0.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139110/20260116_161109_pfjcrn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139109/20260127_152320_xcjeoa.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139110/20260128_124357_r0oksa.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139110/20260116_160936_junmur.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139111/20260316_092053_c7y6fp.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139110/20260128_124425_vvenak.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139114/20260615_105724_1_shzn9g.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139113/20260328_131738_llfsue.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139115/176641021248223_d3e5c426-5403-4931-b6ba-bb7fe7b81921_tppuya.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139114/20260406_111523_rrfqcj.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139115/178179312922344_5f18fdff-bd23-4190-8779-5d96022de2ad_ldsvgb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139115/20260406_145301_va8fie.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139116/1765805476180719_4558a4bc-e3a1-440c-ad7f-cf4ed0d94fae_mkhxv6.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139115/178134537221682_ba640aa7-364c-4de0-bab4-d0166c419af5_yzpyrn.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139118/1766411792514492_865ab87c-aa2b-40e5-acb8-17d4a5966146_kagcxl.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139117/1766410209577865_a78acb1e-23ea-4ca4-852e-9ad5f3caf337_agia4m.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139119/1766410210467151_c3ae05a1-0c12-44f3-ae43-c06f28652ee6_znexgd.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139119/1767441139296527_49528e5c-5b4c-4a0e-9eb9-8b2a9f3b4333_tsayp6.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139121/1768302338515233_9554fe14-2b7e-4d34-b38e-630610700f1c_nmnqh6.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139120/1767697861171122_94af361c-871b-4770-803e-5b91cd2adb7e_ukywbu.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139122/1768324944291060_c6315f9a-e62c-4a3d-a226-a4942661d365_x8gukw.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139121/1768479387269042_b869a323-c0e6-433d-8d32-89e43a39df15_hjrwc0.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139123/1768497402962924_ca5d2ecf-8bcc-47b1-8177-34cf46f60f7d_kwsthk.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139122/1768479388302158_3b0889a8-0fa0-4121-997a-599f82509d2a_swjof2.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139124/1768997120583313_0b1fd23b-63a2-47a5-a0aa-fd202484d976_mh5vzm.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139124/1768997118773941_ab8c3113-7ed0-4b91-a484-655c28e9ac9e_exelqo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139126/1770477336902806_3f40e03b-510c-49cc-9ec4-1596cc2f468c_qqz65n.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139125/1769773246232916_9fcaba01-cf7f-404e-9461-aca8d2ddf9c3_hmgog3.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139127/1774687828180676_27a50d30-7851-421e-99e3-6b4b149c95f6_osnrjc.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139126/1770477339156281_5b8f3b10-91e3-4bb9-b52a-7d182fb364ec_k0461w.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139129/1777395795401225_6b974ebc-0b03-4bca-b2e8-f7e130e6ec00_t6de2j.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139127/1776944847385168_d7cef2fb-705e-4034-a2d6-b18e7ccbd7be_tbfwek.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139130/1779524966185543_980a3443-af1e-4174-a1b1-fc2d9c5944df_a49umc.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139129/1778829892482953_13ad2520-2d6d-4501-adf5-401b6716a9b1_adtz2e.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139131/1779792289142444_942c1621-7227-4696-9141-08731626b189_ojzwza.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139130/1779612334312368_5aa3259d-76a4-432f-88ac-888f04d8c192_t6uj2l.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139131/1780757387364464_44668471-5beb-4d55-add6-321d3a2e1c43_pjst9x.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139132/1781619470491557_1346670b-162b-4bf6-a62d-389cd71e4524_ewgpb9.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139132/1781619473593357_adbe1f33-24bc-4933-97a9-a977791f29ec_mhevn7.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139134/1781793124238223_e621d5f6-b73a-4f8c-be40-39f9f64be6a9_vgesek.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139134/1781619478338142_84d8ae51-58b3-43ba-af93-d165f9cc41a9_s1rqdr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139137/1782211625423862_1f14c93e-8111-4b0c-b230-6e0772103b9a_mmg3yo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139135/1781871839725672_eda17e05-597e-4f19-96f3-6500f4596007_kkhyra.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139138/IMG_4730_z5wweo.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139138/IMG-35dc714f0a470ca1722c86ec6eb5c082-V_amup4h.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139142/IMG_4733_ymb07t.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1787139139/IMG-20260605-WA0000_cchxap.jpg"
];

export function XlXxxlBuketi({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="XL-XXXL Buketi"
      description="Impresivni i raskošni buketi velikih dimenzija. Za trenutke kada riječi nisu dovoljne, a želite ostaviti nezaboravan utisak."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
