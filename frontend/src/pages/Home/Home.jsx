import {useState, useEffect, useContext} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSort} from "@fortawesome/free-solid-svg-icons"
import Dropdown from "react-bootstrap/Dropdown"
import {useNavigate} from "react-router-dom"
import Table from "../../components/Tables/Table"
import Spiner from "../../components/Spiner/Spiner"
import { addData, deletedata, updateData } from '../../components/context/ContextProvider'
import  Alert from 'react-bootstrap/Alert'
import {  deleteData,getData, exportToCsv } from '../../services/Api'
import {toast} from "react-toastify"

const Home = () => {

  const [userData,setUserData] = useState([]);

  const [showspin,setShowSpin] = useState(true);
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState("All")
  const [status, setStatus] = useState("All")
  const [sort, setSort] = useState("new")
  const [page,setPage] = useState(1);
  const [pageCount,setPageCount] = useState(0);
  

  const { userAdd, setUserAdd } = useContext(addData)
  const {update, setUpdate} = useContext(updateData)
  const {deleteuser, setDeleteUser} = useContext(deletedata)

   const navigate = useNavigate()

   const addUser = () => {
    navigate("/register")
   }

   const userGet = async() => {
    const response = await getData(search,gender,status,sort,page)
    console.log(response.data.Pagination.pageCount)
    if(response.status === 200){
      setUserData(response.data.userData)
      setPageCount(response.data.Pagination.pageCount)
    } else {
      console.log("error data")
    }
   }

   const deleteUser = async(id) =>{
       const response = await deleteData(id)
       if(response.status === 200){
        userGet()
        setDeleteUser(response.data)
       }else{
        toast.error("error")
       }
   }

   const exportUser = async()=>{
    const response = await exportToCsv();
    if(response.status === 200){
      window.open(response.data.downloadUrl, "blan k")
    }else {
      toast.error("error")
    }
   }

   const handlePrevious = ()=>{
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }
  
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }


   useEffect(()=>{
    userGet()
    setTimeout(()=>{
        setShowSpin(false)
    },1200)
  },[search,gender,status,sort, page])

  return (
    <>
    {
      userAdd ?  <Alert variant="success" onClose={() => setUserAdd("")} dismissible>{userAdd.fname.toUpperCase()} Succesfully Added</Alert>: ""
    }
    {
       update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Succesfully Update</Alert>:""
    }
    {
       deleteuser ? <Alert variant="danger" onClose={() => setDeleteUser("")} dismissible>{deleteuser.fname.toUpperCase()} Succesfully Delete</Alert>:""
    }
     <div className="container">
        <div className="main_div">
            {/* search add btn */}
            <div className="search_div mt-4 d-flex justify-content-between">
                <div className="search col-lg-4">
                <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={((e) => setSearch(e.target.value))}
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
                </div>

                <div className="add_btn">
                <Button variant="primary" className='custom-button'> 
                    + <span className='button-text' onClick={addUser}>Add User</span></Button>
                </div>
            </div>

            {/* gender status */}

            <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
                <div className="export_csv">
                <Button className='export_btn' onClick={exportUser}>Export to CSV</Button>
                </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
             
             {/* sort */}
             <div className="filter_newold">
                <h3>Sort By Value</h3>
                <Dropdown className='text-center'>
                <Dropdown.Toggle> 
                  <FontAwesomeIcon icon={faSort}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("old")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("new")}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
             </div>

             {/* filter by status */}

             <div className="filter_status">
                <div className="status">
                    <h3>Filter By Status</h3>
                    <div className='status_radio d-flex gap-3'>
                    <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                    </div>
                </div>
             </div>
             {
              showspin ? <Spiner /> :<Table 
                                      userData={userData} 
                                      deleteUser={deleteUser} 
                                       userGet={userGet}
                                       handlePrevious={handlePrevious}
                                       handleNext={handleNext}
                                       page={page}
                                       pageCount={pageCount}
                                       setPage={setPage}
                                      />
             }
            </div>
        </div>
     </div>
    </>
  )
}

export default Home
