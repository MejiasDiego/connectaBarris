import React from "react";


type PropsButton = {
	texto: string;
	pepe: string;
}

const ButtonComponent: React.FC<PropsButton> = (p) => {
	return (
		<button
			style={{
				padding: "10px 15px",
				backgroundColor: "#FFD700",
				border: "none",
				borderRadius: "5px",
				cursor: "pointer",
			}}
		>
		{p.texto}
		</button>
	)
};
export default ButtonComponent;
