import { Nav } from "./components/Nav";
import { Story } from "./components/Story";
import { Scene } from "./three/Scene";

export default function App() {
  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Scene />
      <Nav />
      <main className="relative overflow-x-clip">
        <Story />
      </main>
    </>
  );
}
