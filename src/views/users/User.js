import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import ApiService from "../../service/ApiService";

const User = ({ match }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    ApiService.find(`users/${match.params.id}`).then((data) => {
      setUserDetails(data);
    });
  }, []);

  return (
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>User id: {match.params.id}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <strong>{userDetails.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>
                    <strong>{userDetails.username}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Profile</td>
                  <td>
                    <strong>{userDetails.profile}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <strong>{userDetails.status}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Company</td>
                  <td>
                    <strong>{userDetails.company}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Expire Date</td>
                  <td>
                    <strong>{userDetails.expireDate}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
