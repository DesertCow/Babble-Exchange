import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {

	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);

	useEffect(async () => {
		const data = await JSON.parse(
			localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
		);
		setCurrentUserName(data.username);
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
  background-color: #ccdeed;
  border-radius: 9px 0px 0px 9px;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
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
	padding: 7px;
	width: 100%;
	height: 85vh;
    gap: 0.3rem;
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #7cb2de;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #b1c6de;
      min-height: 4rem;
      cursor: pointer;
      width: 100%;
	  border-radius: 4px;
      padding-left: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.2s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
	.contact:hover {
		background-color: #9bbade;
		border: 1px solid #68a6e3;
		border-radius: 13px;
	}
    .selected {
      background-color: #9a86f3;
    }
  }
`;