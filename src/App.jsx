import { lazy, Suspense } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

const Collections = lazy(() => import('./components/Collections/Collections'));
const Atelier = lazy(() => import('./components/Atelier/Atelier'));
const Musas = lazy(() => import('./components/Musas/Musas'));
const Archivo = lazy(() => import('./components/Archivo/Archivo'));
const Contacto = lazy(() => import('./components/Contacto/Contacto'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function App() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
}

export default App;
