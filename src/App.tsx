import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import AuthLayout from "./layouts/AuthLayout";

const App: React.FC = () => {
  return (
    <div>
      <Header />
        <div className={"min-h-[56.4vh]"}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/search" element={<Search />} />
                    <Route path="/search-result" element={<SearchResult />} />
                </Route>
            </Routes>
        </div>
      <Footer />
    </div>
  );
};

export default App;
