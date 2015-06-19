var link = 'static/git_submodules/france-geojson/departements/69/communes.geojson';
var width = 700;
var height = 700;
var path = d3.geo.path();
var projection = d3.geo.conicConformal()
					.center([4.638707, 45.904212])
					.scale(50000)
					.translate([width / 2, height / 2]);
path.projection(projection);

var svg = d3.select('#map').append("svg")
			.attr("width", width)
			.attr("height", height);

var arrondissement = svg.append("g").attr("id", "departements");

$.get('maladie/projects/nb_malades_code', function(data) {
	data = JSON.parse(data);
	d3.json(link, function(req, geojson) {
		var features = arrondissement.selectAll("path").data(geojson.features);
		var colorScale = d3.scale.category20c();
		features.enter()
			.append("path")
				.attr('class', 'arrondissement')
				.attr('fill', function(d) {
					return colorScale(+d.properties.code);
				})
				.attr('nb_malades', function(d) {
					var code = d.properties.code;
					var short_code = code.substring(code.length-2, code.length);
					var result = 0;
					var is_search = true;
					data.forEach(function(obj) {
						if (is_search && short_code in obj)
						{
							is_search = false;
							result = obj[short_code];
						}
					});
					return result;
				})
				.attr("d", path)
				.attr("onclick", "handler_zone_click($(this))")
	});
});

$.get('maladie/projects/nb_malades_age', function(data) {
	data = JSON.parse(data);
	var ages = [];
	data.sort(function(a, b) {
		var key_a, key_b;
		for (k in a)
			key_a = parseInt(k);
		for (k in b)
			key_b = parseInt(k);
		if (key_a < key_b)
			return -1;
		else if (key_a > key_b)
			return 1;
		else
			return 0;
	});
	data.forEach(function(obj) {
		for(k in obj)
			ages[k] = obj[k];
	});
	console.log(ages);
	var count = 0;
	d3.select("#age-stat")
		.selectAll("div")
			.data(ages)
			.enter().append("div")
				.style("height", function(d) { return d*10 + "px"; })
				.style("margin-right", "1px")
				.style("width", "13px")
				.style("padding-top", function(d) {
					if (d > 0)
						return (d*10) + "px";
					else
						return "0";
				})
				.style("background-color", function(d) {
					if (d > 0)
						return "red";
					else
						return "white";
				})
				.attr("name", function(d) {
					return count++;
				})
				.text(function(d) {
					if (d > 0)
						return d + "";
					else
						return "0";
				});
});

$.get('maladie/projects/nb_malades_civilite', function(data) {
	data = JSON.parse(data);
	var sexes = [];
	data.forEach(function(obj) {
		for(k in obj)
			sexes[k] = obj[k];
	});
	d3.select("#civilite-stat")
		.selectAll("div")
			.data(sexes)
			.enter().append("div")
				.style("width", function(d) { return d + "px"; })
				.attr("name", function(d) {
					if (d == sexes[1])
						return "homme";
					else
						return "femme";
				})
				.text(function(d) { return d; });
});

$.get('maladie/projects/nb_malades_metier', function(data) {
	data = JSON.parse(data);
	metiers_arr = ['police', 'developper', 'manager', 'ouvrier', 'designer', 'consultant'];
	var metiers = [];
	var count = 0;
	data.forEach(function(obj) {
		for(k in obj)
			metiers[k-1] = obj[k];
	});
	d3.select("#metier-stat")
		.selectAll("div")
			.data(metiers)
			.enter().append("div")
				.style("width", function(d) { return d*2 + "px"; })
				.style("margin-bottom", "2px")
				.attr("name", function(d) {
					for (k in metiers)
					{
						if (d == metiers[k])
							return metiers_arr[k];
					}
				})
				.text(function(d) { return d; });
});

function handler_zone_click(obj) {
	$('.content.nb-malade').html(obj.attr('nb_malades'));
}
