import { Intro } from "@/components/Intro";
import { Hero } from "@/components/Hero";
import { Clientes } from "@/components/Clientes";
import { Paz } from "@/components/Paz";
import { Major2026 } from "@/components/Major2026";
import { Posicionamento } from "@/components/Posicionamento";
import { Servicos } from "@/components/Servicos";
import { Proposta } from "@/components/Proposta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <Hero />
        <Clientes />
        <Posicionamento />
        <Servicos />
        <Paz />
        <Major2026 />
        <Proposta />
      </main>
      <Footer />
    </>
  );
}
