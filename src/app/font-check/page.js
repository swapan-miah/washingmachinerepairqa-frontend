import {
  Roboto,
  Open_Sans,
  Lora,
  Montserrat,
  Poppins,
  Nunito,
  Oswald,
  Ubuntu,
  Merriweather,
} from "next/font/google";

// প্রতিটি ফন্ট আলাদা ভাবে ইম্পোর্ট করা
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function page() {
  return (
    <div className=" pt-32">
      <h1 className={roboto.className}>Roboto Font</h1>
      <p className={openSans.className}>Open Sans Font</p>
      <p className={lora.className}>Lora Font</p>
      <p className={montserrat.className}>Montserrat Font</p>
      <p className={poppins.className}>Poppins Font</p>
      <p className={nunito.className}>Nunito Font</p>
      <p className={oswald.className}>Oswald Font</p>

      <p className={ubuntu.className}>Ubuntu Font</p>
      <p className={merriweather.className}>Merriweather Font</p>
    </div>
  );
}
