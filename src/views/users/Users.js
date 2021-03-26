import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CInputGroup,
  CInput,
  CAlert,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import ApiService from "../../service/ApiService";
import statusOptions from "./Status";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [usersData, setUsersData] = useState([]);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    ApiService.find("users").then((data) => setUsersData(data));
  }, []);

  useEffect(() => {
    if (currentPage === 0) setPage(1);
    else currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <div className="animated fadeIn">
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm={5}>
                  <div className="float-left">
                    <CButton
                      onClick={() => history.push("users/create")}
                      // color="primary"
                      size={"sm"}
                      style={{
                        width: 80,
                        backgroundColor: "orange",
                        color: "white",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <text style={{ fontSize: 16 }}>+ Add</text>
                    </CButton>
                  </div>
                </CCol>
                <CCol sm={2}>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>Status: </div>
                    <CDropdown style={{ left: 5 }}>
                      <CDropdownToggle caret style={{ borderColor: "black" }}>
                        {status}
                      </CDropdownToggle>
                      <CDropdownMenu>
                        {statusOptions.map((x) => (
                          <CDropdownItem
                            key={x.key}
                            onClick={() => setStatus(x.op)}
                          >
                            {x.op}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
                </CCol>
                <CCol
                  sm={5}
                  className="d-none d-sm-inline-block align-right"
                  color
                >
                  <CInputGroup className="float-right col-8">
                    <CInput
                      value={search}
                      placeholder="Search"
                      id="search"
                      name="search"
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData.filter((x) => {
                  if (search === "") return x.status === status;
                  else
                    return (
                      x.name.toLowerCase().includes(search.toLowerCase()) &&
                      x.status === status
                    );
                })}
                fields={[
                  { key: "name", _classes: "font-weight-bold" },
                  "username",
                  "profile",
                  "status",
                  {
                    key: "editOrDelete",
                    label: "Actions",
                  },
                ]}
                striped
                itemsPerPage={7}
                activePage={page}
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                  editOrDelete: (item) => (
                    <td style={{ width: 100 }}>
                      {item.status !== "Inactive" && (
                        <>
                          <CButton
                            color="danger"
                            size={"sm"}
                            onClick={() => {
                              ApiService.patch(
                                "users/{id}",
                                { id: item.id },
                                {
                                  status: "Inactive",
                                }
                              ).then(() => {
                                ApiService.find("users").then((data) =>
                                  setUsersData(data)
                                );
                                window.alert(
                                  "User status changed to inactive!"
                                );
                              });
                            }}
                          >
                            <CIcon content={freeSet.cilTrash} />
                          </CButton>
                          &nbsp;
                          <CButton
                            color="info"
                            size={"sm"}
                            onClick={() => history.push(`/users/${item.id}`)}
                          >
                            <CIcon content={freeSet.cilPen} />
                          </CButton>
                        </>
                      )}
                    </td>
                  ),
                }}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={Math.ceil(
                  usersData.filter((x) => {
                    if (search === "") return x.status === status;
                    else
                      return (
                        x.name.toLowerCase().includes(search.toLowerCase()) &&
                        x.status === status
                      );
                  }).length / 7
                )}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Users;
