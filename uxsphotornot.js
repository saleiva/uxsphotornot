Speakers = new Meteor.Collection("speakers");

if (Meteor.is_client) {
	Template.speakerlist.speakers = function () {
    return Speakers.find({}, {sort: {date: 1, from: 1}});
  };
  
  // Template.hello.greeting = function () {
  //   return "Welcome to uxsphotornot.";
  // };
  // 
  // Template.hello.events = {
  //   'click input' : function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
		if (Speakers.find().count() === 0) {
			var speakers = [
				["0", "Humberto Matas", "Innovación y Diseño.", "11/05/2012", "11:15", "12:00"],
				["1", "Ujué Agudo", "Cómo trabajar ágil con desarrollo… y no morir en el intento", "11/05/2012", "12:45", "13:00"],
				["2", "Grace Ascuasiati y Ana Escontrela", "Design Research", "11/05/2012", "13:00", "13:15"],
				["3", "Dolors Pou", "Midiendo la experiencia de usuario: Voice of customer", "11/05/2012", "13:15", "13:30"],
				["4", "Nacho Herranz", "UX for business", "11/05/2012", "13:30", "13:45"],
				["5", "Pablo Sánchez", "¿Somos los diseñadores infalibles?", "11/05/2012", "13:45", "14:00"],
				["6", "Armando Fidalgo", "Interfaces táctiles: el desafío de las tabletas.", "11/05/2012", "16:00", "16:45"],
				["7", "Aritz Suescun", "Siguiente reto: conectar el mundo físico y el digital", "11/05/2012", "17:00", "17:15"],
				["8", "Borja Delgado", "Simplicidad: Less is more vs Enough is better", "11/05/2012", "17:15", "17:30"],
				["9", "Dani Armengol", "Del prototipo a la realidad", "11/05/2012", "17:30", "17:45"],
				["10", "Nacho Madrid", "Afrontando la diversidad en la Experiencia de Usuario", "11/05/2012", "17:45", "18:00"],
				["11", "Daniel Torres Burriel, Olga Constanza, Karina Ibarra y Ana Pérez.", "El perfil UX en la vida real. ¿Comemos o nos comen?.", "11/05/2012", "18:45", "20:45"],
				["12", "Alberto Knapp", "UX y negocio: de dónde venimos y a dónde vamos.", "12/05/2012", "10:00", "10:45"],
				["13", "Mónica Zapata", "Elecciones.es: un cambio de paradigma a los test electorales.", "12/05/2012", "11:00", "11:15"],
				["14", "Idoia Soto", "Diseño para todos no es posible.", "12/05/2012", "11:15", "11:30"],
				["15", "Jordi Sánchez", "Buscamos alguien más 'friqui': la UX (Unemployed eXperience) de la UX", "12/05/2012", "11:30", "11:45"],
				["16", "Tona Monjo", "if (UX= (Agile+OpenSource).multicultural) then...", "12/05/2012", "11:45", "12:00"],
				["17", "Luis Villa, Álvaro Ortiz, Nacho Puell y Álvaro Varona.", "De UX a emprendedor: lo que la UX te contó y no te contó para montar tu empresa.", "12/05/2012", "12:45", "14:30"],
				["18", "Javier Cañada", "Los Sistemas y la Belleza", "12/05/2012", "16.00", "16:45"],
				["19", "Juan Leal, Jesús Gorriti, Sergio Álvarez Leiva y Margarita Barrera", "Más despacio que me quiero enterar: hacia dónde va nuestra profesión.", "12/05/2012", "17:00", "18:45"]
			];
			for (var i = 0; i < speakers.length; i++)
			Speakers.insert({img: speakers[i][0], speaker: speakers[i][1], talk: speakers[i][2], date: speakers[i][3], from: speakers[i][4], to: speakers[i][5]});
		}
  });
}