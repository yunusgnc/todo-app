import Navbar from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";
export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <SideBar />
      {children}
    </div>
  );
}
