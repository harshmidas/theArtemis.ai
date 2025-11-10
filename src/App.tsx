// import Home  from './components/Home.tsx';
// // import ShaderAnimation from './components/ShaderAnimation.tsx';
// const App = () => {
//   return <div>
//     <Home />
//     {/* <ShaderAnimation/> */}
//   </div>;
// };

// export default App;










import React from "react";
import { SeoConfigProvider } from "./context/SeoConfigContext";
import SeoMeta from "./components/SeoMeta";
import DynamicHeader from "./components/DynamicHeader";
import DynamicFooter from "./components/DynamicFooter";
import DynamicScripts from "./components/DynamicScripts";

// ✅ Your existing components
import Home from "./components/Home";
// import ShaderAnimation from "./components/ShaderAnimation"; // Optional

const App: React.FC = () => {
  return (
    
      <SeoConfigProvider>
        {/* SEO & tracking setup */}
        <SeoMeta />
        <DynamicScripts />

        {/* Dynamic branding header */}
        <DynamicHeader />

        {/* Your existing app content */}
        <main>
          <Home />
          {/* <ShaderAnimation /> */}
        </main>

        {/* Dynamic branding footer */}
        <DynamicFooter />
      </SeoConfigProvider>
    
  );
};

export default App;
