import "./table.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEllipsisVertical, faEye, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";
import {statusChange} from "../../services/Api"
import { ToastContainer, toast } from "react-toastify"
import Paginations from "../../components/Pagination/Pagination"


const TableComponent = ({userData,deleteUser, userGet,handlePrevious,handleNext, page,pageCount, setPage}) => {
      
    const handleChange = async(id,status)=>{
         const response = await statusChange(id, status)
         
         if(response.status === 200){
            userGet()
            toast.success("Status Updated")
         }else {
            toast.error("error")
         }
    }

    return (
        <div className="container">
            <Row>
                <div className='col m-2'>
                    <Card className="shadow">
                        <Table className="align-items-center mt-2 rounded-table">
                            <thead className="thead-dark">
                                <tr className="table-dark">
                                    <th>Id</th>
                                    <th>FullName</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Profile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.length > 0 ? userData.map((element,index) => {
                                        return(
                                            <>
                                              <tr>
                                    <td>{index + 1 +(page-1)*4}</td>
                                    <td>{element.fname + element.lname}</td>
                                    <td>{element.email}</td>
                                    <td>{element.gender == "Male" ? "M": "F"}</td>
                                    <td className="d-flex align-items-center">
                                        <Dropdown className="text-center">
                                            <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                                <Badge bg={element.status == "Active" ?  "primary" : "danger"}>
                                                    {element.status} <FontAwesomeIcon icon={faAngleDown} />
                                                </Badge>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleChange(element._id, "Inactive")}>Inactive</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td className="img_parent">
                                        <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                                    </td>
                                    <td>
                                    <Dropdown className="text-center">
                                            <Dropdown.Toggle variant="light" className="action" id="dropdown-basic">                                               
                                                <FontAwesomeIcon icon={faEllipsisVertical} />                                    
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>

                                                <Dropdown.Item>
                                                 <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                                  <FontAwesomeIcon icon={faEye} /><span> View</span>
                                                 </NavLink>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                                      <FontAwesomeIcon icon={faPenToSquare} /><span> Edit</span>
                                                    </NavLink>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <div onClick={() => deleteUser(element._id)}>
                                                        <FontAwesomeIcon icon={faTrash} /> <span> Delete</span>
                                                    </div>
                                                </Dropdown.Item>
                                                
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>                                  
                                </tr> 
                                            </>
                                        )
                                    }) : <div className="no_data text_center">No Data Found</div>
                                }       
                            </tbody>
                        </Table>
                       <Paginations 
                       handlePrevious={handlePrevious} 
                       handleNext={handleNext}
                       page={page}
                       pageCount={pageCount}
                       setPage={setPage}
                       />
                    </Card>
                </div>
            </Row>
            <ToastContainer />
        </div>
    );
}

export default TableComponent;
