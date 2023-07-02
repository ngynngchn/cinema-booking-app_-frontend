import { AnimatePresence } from "framer-motion";

function LocationProvider({ children }) {
	return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

export default LocationProvider;
