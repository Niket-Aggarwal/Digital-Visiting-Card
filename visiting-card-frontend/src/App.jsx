import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PrivacyPolicy from "./Components/Privacy"
import TermsAndConditions from "./Components/Term"
import NotFound from "./Pages/NotFound";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/term" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App