import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
   <Button variant={"link"}><a href="/signup">Sign Up Here</a></Button>
  );
}
