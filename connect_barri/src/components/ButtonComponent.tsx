import React from "react";

type PropsButton = {
	click_event: () => void;
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
			onClick={p.click_event}
		>
		{p.texto}
		</button>
	)
};
export default ButtonComponent;
