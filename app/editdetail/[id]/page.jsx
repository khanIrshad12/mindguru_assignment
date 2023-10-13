import EditDetails from "@/components/EditDetails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const getData = async (id) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");
  try {
    const res = await fetch(`http://localhost:3000/api/details/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const Editpage = async ({ params }) => {
  const { id } = params;
  const { data } = await getData(id);
  const { name, phone, email } = data;
  console.log("data", data);
  return (
    <div>
      <EditDetails id={id} Name={name} Phone={phone} Email={email} />
    </div>
  );
};

export default Editpage;
