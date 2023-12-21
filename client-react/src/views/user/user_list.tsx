import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
//types
import { inputEvent, mouseEvent } from "../../types/types";
// static data
import { filterOptions } from "../../store/static_data";
//importing components
import InputComponent from "../../components/input.component";
import PopUpComponent from "../../components/popup.component";
import ButtonComponent from "../../components/button.component";
import CartComponent from "../../components/card.component";
import SelectComponent from "../../components/select.component";

// https functions import
import { fetchALLUsers, removeUser } from "../../store/api/http";

function UserListPage(): React.ReactElement {
  const [popup, setPopUP] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState(false);
  const [popUpText, setPopUPText] = useState<string>("");
  const storedValue = localStorage.getItem("filter-option");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const cardClickHandler = (event: mouseEvent, name: string, id: string) => {
    event.stopPropagation();
    switch (name) {
      case "cart-container":
        navigate("/user-detail/" + id);
        break;
      case "delete-icon":
        removeUser(id).then((res) => {
          setPopUPText("User Removed Sucessfully");
          popUpHandler();
        });
        break;
      case "edit-icon":
        navigate("/user/edit/" + id);
        break;
      default:
        return false;
    }
  };

  let renderingList;

  if (filteredUsers) {
    renderingList = filteredUsers.map((user: any) => {
      return (
        <CartComponent
          key={user._id}
          cb={cardClickHandler}
          id={user._id}
          name={user.name}
          phone={user.phone}
          email={user.email}
        />
      );
    });
  }

  const popUpHandler = () => {
    setPopUP(!popup);
    getUsersHandler();
  };

  const searchHandler = (event: inputEvent) => {
    const value = event.target.value;
    const updatedList = users.filter((user: any) => {
      const name = user.name.toLowerCase();
      const email = user.email.toLowerCase();
      const phone = user.phone.toString().toLowerCase();
      if (
        name.includes(search) ||
        email.includes(search) ||
        phone.includes(search)
      ) {
        return user;
      }
      return false;
    });
    setFilteredUsers(updatedList);
    setSearch(value);
  };

  const sortingData = useCallback(
    (name: string) => {
      if (users.length > 0) {
        switch (name) {
          case "A-Z":
            const ascendUsers = users.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            );
            setFilteredUsers(ascendUsers);
            break;
          case "Z-A":
            let descentUsers = users.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            );
            descentUsers = descentUsers.reverse();
            setFilteredUsers(descentUsers);
            break;
          case "Last modified":
            const sortByUpdate = users.sort(function (a: any, b: any) {
              return a?.updated_at < b.updated_at
                ? 1
                : a?.updated_at > b?.updated_at
                ? -1
                : 0;
            });
            setFilteredUsers(sortByUpdate);
            break;
          case "Last Inserted":
            const sortedUsers = users.sort(function (a: any, b: any) {
              return a.created_at < b.created_at
                ? 1
                : a.created_at > b.created_at
                ? -1
                : 0;
            });
            setFilteredUsers(sortedUsers);
            break;
          default:
            setFilteredUsers(users);
        }
      }
    },
    [users]
  );

  const getUsersHandler = () => {
    fetchALLUsers()
      .then(() => {
        const usersLocal = JSON.parse(localStorage.getItem("users") || "{}");
        const admin_id = localStorage.getItem("admin-id");
        if (admin_id) {
          setIsLogged(true);
        } else {
          localStorage.removeItem("filter-option");
        }
        setUsers(usersLocal);
      })
      .catch((Err) => {});
  };

  const filterHandler = (event: mouseEvent, label: string) => {
    const target = event.target as Element;
    const value = target.id;
    localStorage.setItem("filter-option", value);
    sortingData(value);
    setFilter(value);
  };

  useEffect(() => {
    sortingData(filter);
  }, [filter, sortingData]);

  useEffect(() => {
    getUsersHandler();
    if (storedValue) {
      setFilter(storedValue);
    }
  }, []);

  const addUserHandler = () => {};

  return (
    <section className="container__outer flex-full m-y-block-large">
      {popup && <PopUpComponent cb={popUpHandler} text={popUpText} />}
      <section className="container__inner container__user-list m-y-block-large">
        <h2>User List</h2>
        {isLogged && (
          <header className="m-y-block-large">
            <div className="pos-relative">
              <div className="container__user-list__imageBox">
                <img src="/assets/icons/search.svg" alt="search" />
              </div>
              <InputComponent
                inType="text"
                value={search}
                label="Enter Keywords"
                placeHolder="Search"
                cb={searchHandler}
              />
            </div>
            <div>
              <SelectComponent
                text={filter}
                options={filterOptions}
                cb={filterHandler}
                label="filter option"
              />
            </div>
            <div>
              <Link to="/user/add" className="component__button save-btn">
                Add User
              </Link>
            </div>
          </header>
        )}
        <main className="container__user-list__cardBox">{renderingList}</main>
      </section>
    </section>
  );
}

export default UserListPage;
