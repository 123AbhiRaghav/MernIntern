import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faPerson, faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Spiner from "../../components/Spiner/Spiner"
import {useParams} from "react-router-dom"
import {singleUser} from "../../services/Api"
import { BASE_URL } from "../../services/helper";
import moment from "moment"
import "./profile.css";

const Profile = () => {
   
  const [userProfile,setUserProfile] = useState({}); 
  const [showspin, setShowSpin] = useState(true);

  const {id} = useParams()
  console.log(id)
  const userData = async() => {
     const response = await singleUser(id)
     if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log("error");
    }
  }

  useEffect(() => {
    userData()
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])

  return (
    <>
    {
      showspin ? <Spiner /> :  <div className="container">
      <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
        <Card.Body>
          <Row className="text-center">
            <Col>
              <div className="card-profile-image mb-4">
                <img src={`${BASE_URL}/uploads/${userProfile.profile}`} alt="Profile" className="img-fluid rounded-circle" />
              </div>
            </Col>
          </Row>

          <div className='text-center'>
            <h3 className='mb-3'>{userProfile.fname + userProfile.lname}</h3>
            <h4 className='mb-2'>
              <FontAwesomeIcon icon={faEnvelope} className="icon" /> 
              <span className="ms-2">{userProfile.email}</span>
            </h4>
            <h5 className='mb-2'>
              <FontAwesomeIcon icon={faPhone} className="icon" /> 
              <span className="ms-2">{userProfile.mobile}</span>
            </h5>
            <h4 className='mb-2'>
              <FontAwesomeIcon icon={faPerson} className='icon' /> 
              <span className="ms-2">{userProfile.gender}</span>
            </h4>
            <h4 className='mb-2'>
              <FontAwesomeIcon icon={faLocationDot} className='icon' /> 
              <span className="ms-2">{userProfile.location}</span>
            </h4>
            <h4 className='mb-2'>
              {userProfile.status}: <span className="text-success">Active</span>
            </h4>
            <h5 className='mb-2'>
              <FontAwesomeIcon icon={faCalendarDays} className='icon' /> 
              <span className="ms-2">{moment(userProfile.datecreated).format("DD-MM-YYYY")}</span>
            </h5>
            <h5>
              <FontAwesomeIcon icon={faCalendarDays} className='icon' /> 
              <span className="ms-2">{userProfile.dateUpdated}</span>
            </h5>
          </div>
        </Card.Body>
      </Card>
    </div>
    }
    </>
  );
}

export default Profile;
