import React, { useState, useImperativeHandle, forwardRef } from "react";
import styled from "styled-components";

const DrawerContainer = styled.div`
  position: absolute;
  top: 0;
  right: -270px;
  transform: ${props =>
    props.visible ? "translate3d(-270px, 0, 0)" : "translate3d(0, 0, 0)"};
  width: 240px;
  height: 80vh;
  background: #343331;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 12px 24px;
  font-size: 16px;
  color: #6b6b76;
  outline: none;
  z-index: 1000;
  border-radius: 20px 0 0 20px;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);

  // Switch to horizontal drawer on smaller device widths
  @media (max-width: 800px) {
    width: 100%;
    height: 200px;
    top: calc(100vh - 338px);
    left: 0;
    transform: ${props =>
      props.visible ? "translate3d(0, 0, 0)" : "translate3d(0, 300px, 0)"};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 300px;
  z-index: 1001;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: #6b6b76;
  border: none;
  color: white;
  opacity: ${props => (props.visible ? "100%" : "0%")};
  transition: opacity 0.6s linear 1s;

  // For smaller device widths
  @media (max-width: 800px) {
    top: -40px;
    right: 60px;
  }
`;

const Drawer = forwardRef((props, ref) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const closeButtonHandler = () => {
    setShowDrawer(false);
  };

  useImperativeHandle(ref, () => ({
    showDrawerHandler() {
      setShowDrawer(true);
    }
  }));

  return (
    <DrawerContainer visible={showDrawer}>
      <CloseButton onClick={closeButtonHandler} visible={showDrawer}>
        X
      </CloseButton>
      <h2 style={{ color: "#97979f" }}>{props.data.Development}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "flex-row",
          alignItems: "center"
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="25px"
          height="25px"
          fill="#6b6b76"
          style={{ marginRight: "12px" }}
        >
          <path d="M 5 3 C 3.9 3 3 3.9 3 5 L 3 19 C 3 20.1 3.9 21 5 21 L 19 21 C 20.1 21 21 20.1 21 19 L 21 5 C 21 3.9 20.1 3 19 3 L 5 3 z M 5 5 L 19 5 L 19 19 L 5 19 L 5 5 z M 11.980469 7 C 10.630469 7 9.68 7.0909375 9 7.2109375 L 9 17 L 11 17 L 11 13.410156 C 11.2 13.440156 11.649453 13.490234 11.939453 13.490234 C 13.239453 13.490234 14.349609 13.169219 15.099609 12.449219 C 15.679609 11.889219 16 11.059844 16 10.089844 C 16 9.1198437 15.580937 8.3007812 14.960938 7.8007812 C 14.310937 7.2707812 13.340469 7 11.980469 7 z M 12.089844 8.6894531 C 13.189844 8.6894531 13.820312 9.2403906 13.820312 10.150391 C 13.820312 11.170391 13.089922 11.769531 11.919922 11.769531 C 11.599922 11.769531 11.19 11.700391 11 11.650391 L 11 8.8105469 C 11.16 8.7705469 11.649844 8.6894531 12.089844 8.6894531 z"></path>
        </svg>
        <p>Availability</p>
      </div>
      <span style={{ marginLeft: "37px" }}>
        <span style={{ color: "#97979f" }}>
          <strong>{props.data.AvailableLots}</strong>
        </span>{" "}
        spots
      </span>
    </DrawerContainer>
  );
});

export default Drawer;
