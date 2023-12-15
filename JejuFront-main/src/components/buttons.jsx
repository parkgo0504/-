import { motion } from "framer-motion";
import styled from "styled-components";

const BigButton = motion(styled.button`
    border: none;
    border-radius: 10px;
    min-width: 8rem;
    font-size: 1.1rem;
    color: #F26D3D;
    padding: 10px 20px;
`)

const Buttons = {
    BigButton : (props) => (
        <BigButton 
            initial={{
                backgroundColor: "#F26D3Dff",
                color: "#ffffff"
            }} 
            whileHover={{
                backgroundColor: "#ff8d36",
                color: "#ffffff"
            }}
            onClick={props.onClick}
        >
            {props.children}
        </BigButton>
    )
}

export default Buttons;