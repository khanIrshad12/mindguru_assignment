
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Register({params}) {
  const {id}=params
  console.log("register",id)
  const session = await getServerSession(authOptions);
  if (session) redirect(`/dashboard/${id}`);

  return <RegisterForm />;
}
