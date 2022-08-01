import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {

    async function fetchLocalData() {

      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      await setCurrentUserName(data.username);
    }
    fetchLocalData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };


  return (
    <>
      <Container>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""
                  }`}
                onClick={() => changeCurrentChat(index, contact)}>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
              // <div className="current-user">
              //   <div className="username">
              //     <h2>{currentUserName}</h2>
              //   </div>
              // </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: auto;
  background-color: white;
  border-radius: 4px 0px 0px 4px;
  .brand {
    display: flex;
    align-items: center;
    gap: 0rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
	overflow: auto;
	padding: 0px;
	width: 100%;
	height: 85vh;
    gap: 0rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #c3c3c3;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: white;
      min-height: 4rem;
      cursor: pointer;
      width: 100%;
      padding-left: 1.5rem;
      display: flex;
      align-items: center;
	  border-top: .7px solid #ededed;
	  border-bottom: .7px solid #ededed;
      transition: 0.1s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #2e2e2e;
		  font-size: 15px;
		  font-weight: 400;
        }
      }
    }
	.contact:hover {
		background-color: #f3f3f3;
	}
	.contact:active {
		background-color: #dedede;
	}
    .selected {
      background-color: #dedede;
    }
  }
`;