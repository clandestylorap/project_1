$(document).ready(function () {
	const namePageActual = nomPage();
	const pagesNotRequiredSession = ["index.html", "nosotros.html", "contactanos.html", "sign-in.html", "sign-up.html"];
	const pagesRequiredSession = ["main.html", "filter.html", "coupe.html", "compacto.html", "furgoneta.html", "familiar.html", "4x4suv.html", "monovolumen.html", "cabrio.html", "berlina.html"];
	new WOW().init();
	if (pagesNotRequiredSession.includes(namePageActual) || pagesRequiredSession.includes(namePageActual)) {
		printNameUserSession();
		printNameCompany();
		if (namePageActual == "main.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				filterGallery();
				printAllCars();
			} else window.location.href = "index.html";
		} else if (namePageActual == "coupe.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("coupe", "Coupe");
			} else window.location.href = "sign-in.html";

		} else if (namePageActual == "compacto.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("compacto", "Compact");
			} else window.location.href = "sign-in.html";

		} else if (namePageActual == "furgoneta.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("furgoneta", "Van");
			} else window.location.href = "sign-in.html";

		} else if (namePageActual == "berlina.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("berlina", "Berlina");
			} else window.location.href = "sign-in.html";

		} else if (namePageActual == "familiar.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("familiar", "Family");
			} else window.location.href = "sign-in.html";

		} else if (namePageActual == "cabrio.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("cabrio", "Cabrio");
			} else window.location.href = "sign-in.html";

		} else if (namePageActual == "4x4suv.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("4x4suv", "4x4 Suv");
			} else window.location.href = "sign-in.html";

		} else if (namePageActual == "monovolumen.html") {
			if (sessionStorage["restrenacar_usuario"]) {
				redirectPageType("monovolumen", "Minivan");
			} else window.location.href = "sign-in.html";
		} else if (namePageActual == "filter.html") {
			if (sessionStorage["restrenacar_usuario"]) {} else window.location.href = "sign-in.html";
		}
	}
});

function printNameCompany() {
	var nombres = document.getElementsByClassName("nombreEmpresa");
	for (let index = 0; index < nombres.length; index++) {
		nombres[index].innerHTML = nombreEmpresa; //nombreEmpresa es una variable global
	}
}

function printNameUserSession() {
	if (sessionStorage["restrenacar_usuario"]) {
		let nameUser = sessionStorage["restrenacar_usuario"].split("@").shift();
		let spanUsersNames = document.getElementsByClassName("nameUser");
		let sectionSpanUsersName = document.getElementsByClassName("sectionUserName");
		for (let i = 0; i < spanUsersNames.length; i++) {
			spanUsersNames[i].innerHTML = nameUser;
		}
		for (let j = 0; j < sectionSpanUsersName.length; j++) {
			sectionSpanUsersName[j].classList.add("d-block");
		}
	}
}

function nomPage() {
	var url = window.location.pathname;
	var page = url.split("/").pop();
	return page;
}

function sign_in() {
	var email = document.getElementById("sign-in_email").value;
	var password = document.getElementById("sign-in_password").value;
	const usuario_array = users.find(user => user.email === email);
	const localStorage_email = localStorage.getItem("restrenacar_" + email);
	const localStorage_password = localStorage.getItem("restrenacar_" + password);

	if (email !== "" && password !== "") {
		if (usuario_array !== undefined) {
			if (usuario_array.password === password) {
				sessionStorage.setItem("restrenacar_usuario", usuario_array.email);
				window.location.href = "main.html";
			} else {
				document.getElementById("sign-in___err").innerHTML = "Incorrect password!";
				document.getElementById("sign-in___err").classList.add("d-block");
			}
		} else if (localStorage_email !== "" && localStorage_email !== null) {
			if (localStorage_password === password) {
				sessionStorage.setItem("restrenacar_usuario", localStorage_email);
				window.location.href = "main.html";
			} else {
				document.getElementById("sign-in___err").innerHTML = "Incorrect password!";
				document.getElementById("sign-in___err").classList.add("d-block");
			}
		} else {
			document.getElementById("sign-in___err").innerHTML = "User not found!";
			document.getElementById("sign-in___err").classList.add("d-block");
		}
	} else {
		document.getElementById("sign-in___err").innerHTML = "Enter email and password.";
		document.getElementById("sign-in___err").classList.add("d-block");
	}
}

function sign_up() {
	var nombre = document.getElementById("sign-up_nombre").value;
	var sexo = document.getElementById("sign-up_sexo").value;
	var email = document.getElementById("sign-up_email").value;
	var password = document.getElementById("sign-up_password").value;
	if (email !== "" && password !== "" && nombre !== "" && sexo !== "") {
		localStorage.setItem("restrenacar_" + password, password);
		localStorage.setItem("restrenacar_" + email, email);
		document.getElementById("sign-up___check").innerHTML = "User created correctly!";
		document.getElementById("sign-up___check").classList.add("d-block");
		document.getElementById("sign-up_nombre").value = "";
		document.getElementById("sign-up_sexo").value = "";
		document.getElementById("sign-up_email").value = "";
		document.getElementById("sign-up_password").value = "";
	} else {
		document.getElementById("sign-up___err").innerHTML = "Fill in your details";
		document.getElementById("sign-up___err").classList.add("d-block");
	}
}

function sign_out() {
	window.location.href = "index.html";
	sessionStorage.removeItem('restrenacar_usuario');
}

function filter_cars() {
	let cochesFiltrats = [];
	var typeCar = document.getElementById("filter_type_coche").value;
	var typeCombustible = document.getElementById("filter_combustible").value;
	var typeCambio = document.getElementById("filter_cambio").value;
	var year1 = document.getElementById("filter_year1").value;
	var year2 = document.getElementById("filter_year2").value;
	console.log(typeCombustible)
	for (var i = coches.length - 1; i >= 0; i--) {
		if (typeCar === "all") {
			if (typeCombustible === "all") {
				if (typeCambio=== "all") {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				} else if (coches[i].cambio === typeCambio) {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				}
			} else if (coches[i].combustible === typeCombustible) {
				if (typeCambio === "all") {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				} else if (coches[i].cambio === typeCambio) {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				}

			}
		} else if (coches[i].tipo === typeCar) {
			if (typeCombustible === "all") {
				if (typeCambio=== "all") {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				} else if (coches[i].cambio === typeCambio) {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				}
			} else if (coches[i].combustible === typeCombustible) {
				if (typeCambio === "all") {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				} else if (coches[i].cambio === typeCambio) {
					if (coches[i].year >= year1 && coches[i].year <= year2) {
						cochesFiltrats.push(coches[i])
					}
				}

			}
		}
	}
	printFilterCar(cochesFiltrats);

}

function printFilterCar(cochesFiltrats) {
	var dades = `<div class="col-12">
	<p class="grey-text">These are the cars we have found<i class="ml-2 fas fa-list-ol"></i></p>
  </div>`;
	for (let i = 0; i < cochesFiltrats.length; i++) {
		dades = dades + `<div class="col-sm-12 col-md-6 col-lg-4 mb-5">
								<div class="card card-personal">
								<div class="view">
									<img class="card-img-top" src="img/coches/${cochesFiltrats[i].id}.jpg" alt="Card image cap">
								<a href="#!">
									<div class="mask"></div>
								</a>
								</div>
								<div class="card-body">
								<a>
									<h5 class="card-title">${cochesFiltrats[i].marca}</h5>
								</a>
								<a class="card-meta">${cochesFiltrats[i].modelo}</a>
								<p class="card-text">${cochesFiltrats[i].year} | ${cochesFiltrats[i].kilometraje} | ${cochesFiltrats[i].potencia} | ${cochesFiltrats[i].cambio} | ${cochesFiltrats[i].precio}€</p>
								<hr>
								<a class="card-meta"><span><i class="fas fa-eye mr-2"></i></i>${cochesFiltrats[i].vistas} views</span></a>
								<p class="card-meta float-right text-default text-uppercase">${cochesFiltrats[i].combustible}</p>
								<ul class="navbar-nav ml-auto nav-flex-icons mt-3">
									<li class="nav-item avatar">
									<img src="img/pegatina/${cochesFiltrats[i].pegatina}.png" class="rounded-circle z-depth-0" alt="avatar image" height="35">
									</li>
								</ul>
								</div>
							</div>
						</div>`;
	}
	if(cochesFiltrats.length!=0){
		document.getElementById("filter-cars").innerHTML = dades;
	}
	else{
		document.getElementById("filter-cars").innerHTML = `<div class="card text-center">
															<div class="card-body">
															No cars with filters applied have been found :(
															</div>
														</div>`;
	}
}




function redirectPageType(tipo, title) {
	var dades = `<div class="col-12">
					<p class="grey-text">${title} cars<i class="ml-2 fas fa-car-side"></i></p>
  				</div>`;
	for (var i = 0; i < coches.length; i++) {
		if (coches[i].tipo === tipo) {
			dades = dades + `<div class="col-sm-12 col-md-6 col-lg-4 mb-5">
								<div class="card card-personal">
			 					<div class="view">
			   						<img class="card-img-top" src="img/coches/${coches[i].id}.jpg" alt="Card image cap">
			   					<a href="#!">
				 					<div class="mask"></div>
			  					 </a>
			 					</div>
								<div class="card-body">
								<a>
									<h5 class="card-title">${coches[i].marca}</h5>
								</a>
								<a class="card-meta">${coches[i].modelo}</a>
								<p class="card-text">${coches[i].year} | ${coches[i].kilometraje} | ${coches[i].potencia} | ${coches[i].cambio} | ${coches[i].precio}€</p>
								<hr>
								<a class="card-meta"><span><i class="fas fa-eye mr-2"></i></i>${coches[i].vistas} views</span></a>
								<p class="card-meta float-right text-default text-uppercase">${coches[i].combustible}</p>
								<ul class="navbar-nav ml-auto nav-flex-icons mt-3">
									<li class="nav-item avatar">
									<img src="img/pegatina/${coches[i].pegatina}.png" class="rounded-circle z-depth-0" alt="avatar image" height="35">
									</li>
								</ul>
								</div>
							</div>
							</div>`;
		}
	}
	document.getElementById(tipo + "-cars").innerHTML = dades;
}

function printAllCars() {

	var dades = `<div class="col-12">
					<p class="grey-text">All the cars in our catalogue<i class="ml-2 fas fa-list-ol"></i></p>
  				</div>`;
	for (var i = coches.length - 1; i >= 0; i--) {
		dades = dades + `<div class="col-sm-12 col-md-6 col-lg-4 mb-5">
								<div class="card card-personal">
			 					<div class="view">
			   						<img class="card-img-top" src="img/coches/${coches[i].id}.jpg" alt="Card image cap">
			   					<a href="#!">
				 					<div class="mask"></div>
			  					 </a>
			 					</div>
								<div class="card-body">
								<a>
									<h5 class="card-title">${coches[i].marca}</h5>
								</a>
								<a class="card-meta">${coches[i].modelo}</a>
								<p class="card-text">${coches[i].year} | ${coches[i].kilometraje} | ${coches[i].potencia} | ${coches[i].cambio} | ${coches[i].precio}€</p>
								<hr>
								<a class="card-meta"><span><i class="fas fa-eye mr-2"></i></i>${coches[i].vistas} views</span></a>
								<p class="card-meta float-right text-default text-uppercase">${coches[i].combustible}</p>
								<ul class="navbar-nav ml-auto nav-flex-icons mt-3">
									<li class="nav-item avatar">
									<img src="img/pegatina/${coches[i].pegatina}.png" class="rounded-circle z-depth-0" alt="avatar image" height="35">
									</li>
								</ul>
								</div>
							</div>
							</div>`;

	}
	document.getElementById("all-cars").innerHTML = dades;
}


function filterGallery() {
	var selectedClass = "";
	$(".filter").click(function () {
		selectedClass = $(this).attr("data-rel");
		$("#gallery").fadeTo(100, 0.1);
		$("#gallery div").not("." + selectedClass).fadeOut().removeClass('animation');
		setTimeout(function () {
			$("." + selectedClass).fadeIn().addClass('animation');
			$("#gallery").fadeTo(300, 1);
		}, 300);
	});
}