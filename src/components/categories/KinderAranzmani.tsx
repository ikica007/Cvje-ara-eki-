import { CategoryTemplate } from '../CategoryTemplate';

interface Props {
  onBack: () => void;
}

const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356584/660466013_4336554946661574_5281253428658425319_n_g4bmqp.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356583/598425962_4234212580229145_2511910283646298255_n_xwajii.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356582/584919245_4215359418781128_8394525530925209586_n_rd11mb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356581/508333514_4055500964766975_7592252474296084012_n_sg66p4.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356580/508310887_4055501064766965_6271175932632134087_n_xbdoha.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356579/506238038_4051734015143670_685809349774055989_n_uusrjd.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356578/506211903_4052376238412781_4107668938408650072_n_eploca.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356576/506157329_4050938458556559_1924253125466326785_n_ufvjev.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356575/506054885_4050940445223027_6064185472578429142_n_ixozdq.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356574/506050478_4050938805223191_5083559128041569713_n_oitqmg.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356573/506050478_4050938618556543_7891831041461600051_n_b1ecm4.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356572/506048361_4050946418555763_4483347546317865437_n_va4kmr.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356571/506047601_4050938411889897_8681499803389646094_n_lqknku.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356570/506047144_4050938518556553_6388546428038540206_n_hz3j2q.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356568/506046007_4050938538556551_3414054891005461785_n_ib3dxb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356567/506003640_4050938625223209_2279385514851297128_n_sfixmb.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356565/505878508_4050938498556555_1675904317175293724_n_jgavoe.jpg",
  "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356565/505527795_4051071458543259_4701757813384663869_n_a37yh7.jpg"
];

export function KinderAranzmani({ onBack }: Props) {
  return (
    <CategoryTemplate 
      title="Kinder Aranžmani"
      description="Slatka iznenađenja za najmlađe, i one koji se tako osjećaju. Aranžmani ispunjeni omiljenim Kinder čokoladicama."
      images={CLOUDINARY_IMAGES}
      onBack={onBack}
    />
  );
}
