import { useLocation, useNavigate } from "react-router-dom"
import Layout from "../../components/layout"


const ManagePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  console.log("location",location?.state)
  
  return(
    <Layout title="">

    </Layout>
  )
}

export default ManagePage