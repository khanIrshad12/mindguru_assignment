import AddDetails from "@/components/AddDetails"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
const AddCompnent = async({params}) => {
  
  const {id}=params
    const session = await getServerSession(authOptions);
    if(!session){
        redirect('/register')
    }
  return (
    <div>
        <AddDetails id={id} />
    </div>
  )
}

export default AddCompnent