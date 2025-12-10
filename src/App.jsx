import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MemberForm from "./pages/Register";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/register" element={<MemberForm />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
