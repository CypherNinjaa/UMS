import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname, hash, key } = useLocation();

	useEffect(() => {
		// If there's a hash, let the browser handle the scroll to the anchor
		if (hash) {
			setTimeout(() => {
				const element = document.querySelector(hash);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}, 0);
		} else {
			// Scroll to top when route changes (no hash)
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "auto", // You can change this to "auto" for instant scroll
			});
		}
	}, [pathname, hash, key]);

	return null;
};

export default ScrollToTop;
