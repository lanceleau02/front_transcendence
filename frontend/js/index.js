import Batpong from "./views/Batpong.js";
import Batcave from "./views/Batcave.js";
import Batprofile from "./views/Batprofile.js";

const navigateTo = url => {
	history.pushState(null, null, url);
	router();
};

const router = async () => {
	const routes = [
		{ path: "/", view: Batpong },
		{ path: "/batcave", view: Batcave },
		{ path: "/batprofile", view: Batprofile },
	];
	
	// Test each route for potential match
	const potentialMatches = routes.map(route => {
		return {
			route: route,
			isMatch: location.pathname === route.path
		}
	});
	
	let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
	
	if (!match) {
		match = {
			route: routes[0],
			isMatch: true
		};
	}

	const view = new match.route.view();
	//const response = await view.getHtml();
	document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", e => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});

	router();
});