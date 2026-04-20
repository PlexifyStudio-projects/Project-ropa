import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Collections from './components/Collections/Collections';
import Atelier from './components/Atelier/Atelier';
import Musas from './components/Musas/Musas';
import Archivo from './components/Archivo/Archivo';
import Contacto from './components/Contacto/Contacto';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collections />
        <Atelier />
        <Musas />
        <Archivo />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

export default App;
