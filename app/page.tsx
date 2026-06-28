import { Intro } from "@/components/Intro";
import { Hero } from "@/components/Hero";
import { Clientes } from "@/components/Clientes";
import { Paz } from "@/components/Paz";
import { Major2026 } from "@/components/Major2026";
import { Posicionamento } from "@/components/Posicionamento";
import { Servicos } from "@/components/Servicos";
import { Proposta } from "@/components/Proposta";
import { VideoBg } from "@/components/VideoBg";
import { VideoShowcase } from "@/components/VideoShowcase";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <Hero />
        <Clientes />
        <VideoShowcase />
        <Posicionamento />
        <Servicos />
        <Paz />
        <Major2026 />
        <VideoBg />
        <Proposta />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  );
}
