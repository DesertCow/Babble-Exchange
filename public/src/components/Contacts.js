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
        <div className="contacts m-2 p-2 justify-content-start">
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
  background-color: #c2d1d1;
  border-radius: 7px 0px 0px 7px;
  padding-right:1px;
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
	margin: 5px;
	height: 85vh;
    gap: .2rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #c3c3c3;
        border-radius: 1rem;
      }
    }
    .contact {
  		background-color: #f0fafa;
		min-height: 3.5rem;
		cursor: pointer;
		width: 100%;
		padding-left: 1.2rem;
		display: flex;
		align-items: center;
		border-radius: 4px;
		border-top: .7px solid #ededed;
		border-bottom: .7px solid #ededed;
		transition: 0.2s ease-in-out;
		.avatar {
			img {
			height: 3rem;
			}
      	}
      .username {
			h3 {
			color: #545454;
			font-size: 15px;
			font-weight: 500;
			transition: 0.2s ease-in-out;
			}
     	}
    }
	.contact:hover {
		background-color: rgba(221, 232, 251);
		border: .7px solid #7f98a3;
		border-radius: 9px;
		box-shadow: 0px 1px 3px rgba(169, 195, 206, .7);
		.username {
			h3 {
			color: #2e2e2e;
			font-size: 16px;
			font-weight: 600;
			}
     	}
	}
	.contact:active {
		background-color: #fcffff;
		border: .7px solid #7f98a3;
		box-shadow: 0px 1px 2px rgba(169, 195, 206, 1);
		border-radius: 9px;
		.username {
			h3 {
			color: #2e2e2e;
			font-size: 16px;
			font-weight: 600;
			}
     	}


	}
    .selected {
        background-color: #fcffff;
		border: .7px solid #7f98a3;
		box-shadow: 0px 1px 2px rgba(169, 195, 206, 1);
		border-radius: 9px;
		.username {
			h3 {
			color: #2e2e2e;
			font-size: 16px;
			font-weight: 600;
			}
     	}



    }
  }
`;