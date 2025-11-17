import { useEffect, useState } from "react";

// Le custom hook
export const useIsMounted = () => {
	const [isMountedRef, setIsMountedRef] = useState(false);

	useEffect(() => {
		const checKIsMounted = () => {
			setIsMountedRef(true); // Passe à true au montage
		};
		checKIsMounted();
		return () => {
			setIsMountedRef(false); // Passe à false au démontage
		};
	}, []);

	return isMountedRef;
};
