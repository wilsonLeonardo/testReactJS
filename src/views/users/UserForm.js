import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CTabs,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane,
  CLabel,
  CFormGroup,
  CInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormText,
} from "@coreui/react";

import statusOptions from "./Status";
import InputMask from "react-input-mask";
import ApiService from "../../service/ApiService";

const profileOptions = [
  { key: 1, option: "Owner" },
  { key: 2, option: "Driver" },
  { key: 3, option: "Office" },
];

const companyOptions = [
  { key: 1, option: "Company 1" },
  { key: 2, option: "Company 2" },
  { key: 3, option: "Company 3" },
];

const Input = React.memo((props) => {
  const { name, value, maskChar, ...inputProps } = props;
  return <CInput value={value} name={name} {...inputProps} />;
});

const UserRegistry = (props) => {
  const [confirm, setConfirm] = useState("");
  const [expire, setExpire] = useState(false);
  const [data, setData] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    pNumber: "",
    mNumber: "",
    expireDate: "",
    password: "",
    status: "Active",
  });

  function changeValue(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  function insertData() {
    if (
      data.userName === "" ||
      data.fName === "" ||
      data.lName === "" ||
      data.email === "" ||
      data.mNumber === "" ||
      data.password === ""
    )
      return window.alert("Fill in all required fields!");
    else if (
      data.password !== "" &&
      confirm !== "" &&
      data.password !== confirm
    )
      return window.alert("The passwords don't match");
    else {
      props.insertData(data);
    }
  }

  return (
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol lg="6">
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-email">
                    Username<text style={{ color: "red" }}>*</text>
                  </CLabel>
                  <CInput
                    type="username"
                    value={data.userName}
                    onChange={(event) => changeValue(event)}
                    id="username"
                    name="username"
                  />
                </CFormGroup>
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-password">
                    Full name<text style={{ color: "red" }}>*</text>
                  </CLabel>
                  <CRow style={{ paddingLeft: 15 }}>
                    <CInput
                      id="fName"
                      value={data.fName}
                      name="fName"
                      onChange={(event) => changeValue(event)}
                      className={"col-4"}
                      placeholder="First name"
                    />
                    <CInput
                      value={data.lName}
                      id="lName"
                      className={"col-7"}
                      onChange={(event) => changeValue(event)}
                      style={{ marginLeft: 20 }}
                      name="lName"
                      placeholder="Last name"
                    />
                  </CRow>
                </CFormGroup>
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-password">
                    Email<text style={{ color: "red" }}>*</text>
                  </CLabel>
                  <CInput
                    id="email"
                    value={data.email}
                    type="email"
                    onChange={(event) => changeValue(event)}
                    name="email"
                  />
                </CFormGroup>
                <CFormGroup className="col-12">
                  <CRow>
                    <CFormGroup className="col-5">
                      <CLabel htmlFor="nf-password">Phone Number</CLabel>
                      <InputMask
                        value={data.pNumber}
                        name="pNumber"
                        mask="(999) 999-9999"
                        onChange={(event) => changeValue(event)}
                      >
                        <Input />
                      </InputMask>
                    </CFormGroup>
                    <CFormGroup className="col-5">
                      <CLabel htmlFor="nf-password">
                        Mobile Phone<text style={{ color: "red" }}>*</text>
                      </CLabel>
                      <InputMask
                        value={data.mNumber}
                        name="mNumber"
                        mask="(999) 999-9999"
                        onChange={(event) => changeValue(event)}
                      >
                        <Input />
                      </InputMask>
                    </CFormGroup>
                  </CRow>
                </CFormGroup>
              </CCol>
              <CCol lg="6">
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-email">
                    Password<text style={{ color: "red" }}>*</text>
                  </CLabel>
                  <CInput
                    type="password"
                    value={data.password}
                    id="password"
                    name="password"
                    onChange={(event) => changeValue(event)}
                  />
                </CFormGroup>
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-email">
                    Confirm Password<text style={{ color: "red" }}>*</text>
                  </CLabel>
                  <CInput
                    type="password"
                    value={confirm}
                    id="password"
                    name="password"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  {confirm !== data.password && confirm !== "" && (
                    <CFormText className="help-block">
                      <text style={{ color: "red" }}>
                        The passwords don't match
                      </text>
                    </CFormText>
                  )}
                </CFormGroup>
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-email">Expire</CLabel>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    <div>
                      <input
                        type="radio"
                        id="huey"
                        name="drone"
                        value="huey"
                        checked={expire}
                        onClick={() => setExpire(true)}
                      />
                      &nbsp;
                      <label>Yes</label>
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      <input
                        type="radio"
                        id="huey"
                        name="drone"
                        value="huey"
                        checked={!expire}
                        onClick={() => setExpire(false)}
                      />
                      &nbsp;
                      <label> Never</label>
                    </div>
                  </div>
                </CFormGroup>
                <CFormGroup className="col-10">
                  <CRow
                    style={{
                      // paddingLeft: 15,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {expire && (
                      <CFormGroup className="col-5">
                        <CLabel htmlFor="nf-email">Expire Date</CLabel>
                        <InputMask
                          value={data.expireDate}
                          name="expireDate"
                          mask="9999-99-99"
                          onChange={(event) => changeValue(event)}
                        >
                          <Input />
                        </InputMask>
                      </CFormGroup>
                    )}

                    <CFormGroup className="col-5">
                      <CLabel htmlFor="nf-email">Status</CLabel>
                      <CDropdown>
                        <CDropdownToggle
                          caret
                          style={{ borderColor: "lightGray" }}
                        >
                          {data.status}
                        </CDropdownToggle>
                        <CDropdownMenu>
                          {statusOptions.map((x) => (
                            <CDropdownItem
                              key={x.key}
                              onClick={() => setData({ ...data, status: x.op })}
                            >
                              {x.op}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </CFormGroup>
                  </CRow>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" lg="12">
                <div className="float-right">
                  <CButton
                    size={"sm"}
                    style={{
                      width: 80,
                      borderColor: "lightGray",
                    }}
                    onClick={() => props.history.push("/users")}
                  >
                    Cancel
                  </CButton>
                  &nbsp;
                  <CButton
                    size={"sm"}
                    style={{
                      width: 80,
                      backgroundColor: "orange",
                      color: "white",
                    }}
                    onClick={insertData}
                  >
                    Next
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const Profile = (props) => {
  const [profile, setProfile] = useState("Owner");
  const [company, setCompany] = useState("Company 1");

  function createUser() {
    if (props.data.username === undefined)
      return window.alert("Fill before step!");

    ApiService.insert("users", {
      name: props.data.fName + " " + props.data.lName,
      username: props.data.username,
      profile: props.data.profile,
      phoneNumber: props.data.pNumber,
      mobileNumber: props.data.mNumber,
      expireDate: props.data.expireDate,
      status: props.data.status,
      company,
      profile,
    }).then(() => props.history.push("/users"));
  }

  return (
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol lg="6">
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-email">
                    Username<text style={{ color: "red" }}>*</text>
                  </CLabel>
                  <CInput
                    type="username"
                    id="username"
                    value={props.data.username}
                    name="username"
                    disabled
                    style={{ color: "white" }}
                  />
                </CFormGroup>
                <CFormGroup className="col-10">
                  <CLabel htmlFor="nf-password">
                    Full name<text style={{ color: "red" }}>*</text>
                  </CLabel>
                  <CRow style={{ paddingLeft: 15 }}>
                    <CInput
                      id="fName"
                      value={props.data.fName}
                      name="fName"
                      disabled
                      style={{ color: "white" }}
                      className={"col-4"}
                      placeholder="First name"
                    />
                    <CInput
                      id="lName"
                      className={"col-7"}
                      style={{ marginLeft: 20, color: "white" }}
                      value={props.data.lName}
                      name="lName"
                      disabled
                      placeholder="Last name"
                    />
                  </CRow>
                </CFormGroup>
                <CFormGroup className="col-6">
                  <CRow
                    style={{
                      // paddingLeft: 15,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CFormGroup className="col-5">
                      <CLabel htmlFor="nf-email">Profile</CLabel>
                      <CDropdown>
                        <CDropdownToggle
                          caret
                          style={{ borderColor: "lightGray" }}
                        >
                          {profile}
                        </CDropdownToggle>
                        <CDropdownMenu>
                          {profileOptions.map((x) => (
                            <CDropdownItem
                              key={x.key}
                              onClick={() => setProfile(x.option)}
                            >
                              {x.option}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </CFormGroup>
                    <CFormGroup className="col-5">
                      <CLabel htmlFor="nf-email">Company</CLabel>
                      <CDropdown>
                        <CDropdownToggle
                          caret
                          style={{ borderColor: "lightGray" }}
                        >
                          {company}
                        </CDropdownToggle>
                        <CDropdownMenu>
                          {companyOptions.map((x) => (
                            <CDropdownItem
                              key={x.key}
                              onClick={() => setCompany(x.option)}
                            >
                              {x.option}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </CFormGroup>
                  </CRow>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" lg="12">
                <div className="float-right">
                  <CButton
                    size={"sm"}
                    style={{
                      width: 80,
                      borderColor: "lightGray",
                    }}
                    onClick={() => props.history("/users")}
                  >
                    Cancel
                  </CButton>
                  &nbsp;
                  <CButton
                    size={"sm"}
                    style={{
                      width: 80,
                      backgroundColor: "orange",
                      color: "white",
                    }}
                    onClick={createUser}
                  >
                    Save
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
const UsersForm = () => {
  const [active, setActive] = useState("userRegistry");
  const [data, setData] = useState({});
  const history = useHistory();

  function insertData(data) {
    setData(data);
    setActive("profile");
  }
  return (
    <CTabs activeTab={active}>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="userRegistry">User Registry</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="profile">Profile</CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane data-tab="userRegistry">
          <UserRegistry insertData={insertData} history={history} />
        </CTabPane>
        <CTabPane data-tab="profile">
          <Profile data={data} history={history} />
        </CTabPane>
      </CTabContent>
    </CTabs>
  );
};

export default UsersForm;
