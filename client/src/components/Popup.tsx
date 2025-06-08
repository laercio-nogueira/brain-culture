import styled from "styled-components";

const PopupStyle = styled.div`
  width: 200px;
  min-height: 50px;
  border-radius: 10px;
  border: 1px solid #fff;
  position: fixed;
  top: 10px;
  right: 100px;
  color: #fff;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .close {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    transition: all 0.3s ease;
  }

  p {
    margin-top: 20px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
`;

const colorRules: any = {
  error: "#f44336",
  success: "#4caf50",
  warning: "#ff9800",
  info: "#2196f3",
};

const Popup = ({ text, type, onClose }: any) => {
  const formatMessage = (message: string | string[]) => {
    console.log(message);
    return Array.isArray(message) ? message.join(" ") : message;
  };

  return (
    <PopupStyle
      className="popup"
      style={{ backgroundColor: colorRules[type] || "#4caf50" }}
    >
      <button className="close" onClick={onClose}>
        x
      </button>
      <p>{formatMessage(text)}</p>
    </PopupStyle>
  );
};

export default Popup;
