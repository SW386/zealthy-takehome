import { BrowserRouter, Routes, Route } from "react-router";
import AdminPage from './pages/AdminPage';
import DataPage from './pages/DataPage';
import SingupPage from './pages/SingupPage';
import NavigationComponent from './components/NavigationComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route index element={<NavigationComponent child={<SingupPage/>} />} />
       <Route path="admin" element={<NavigationComponent child={<AdminPage/>} />} />
       <Route path="data" element={<NavigationComponent child={<DataPage/>} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
