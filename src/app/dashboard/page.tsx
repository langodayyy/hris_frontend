
import { Metadata } from "next";
import  Sidebar  from "../../components/sidebar";
import AuthGate from "@/components/custom/authGate";
// import HomeClient from "./aboutMe";


export default function Dashboard() {
  return (
    // <AuthGate>
    <Sidebar title="Dashboard">
         <div>Welcome to the Dashboard</div>
       </Sidebar>
    // </AuthGate>
  );
}
