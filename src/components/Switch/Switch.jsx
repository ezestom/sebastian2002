// components/Switch/Switch.jsx
import "./Switch.css";
import { useState } from "react";

export function Switch() {
	const [checked, setChecked] = useState(false);

	const handleChange = (e) => {
		alert(e.target.checked);
		setChecked(e.target.checked);
	};

	return (
		<article className="checkbox-wrapper-10 relative">
			<label
				htmlFor="AcceptConditions"
				className="relative h-8 w-12 cursor-pointer [-webkit-tap-highlight-color:_transparent]">
				<input
					type="checkbox"
					id="AcceptConditions"
					className="peer sr-only"
					checked={checked}
					onChange={handleChange}
				/>
				<span className="absolute inset-0 m-auto h-2 rounded-full bg-gray-400"></span>
				<span className="absolute inset-y-0 start-0 m-auto h-6 w-6 rounded-full bg-gray-700 transition-all peer-checked:start-6 peer-checked:[&_>_*]:scale-0">
					<span className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-gray-400 transition">
						{" "}
					</span>
				</span>
			</label>
		</article>
	);
}
