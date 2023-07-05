import React from "react";
import styled from "styled-components";

function Header({ children }) {
	return <Head>{children}</Head>;
}

export default Header;

const Head = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
