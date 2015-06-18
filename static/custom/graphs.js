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

d3.json(link, function(req, geojson) {
	var features = arrondissement.selectAll("path").data(geojson.features);
	var colorScale = d3.scale.category20c();
	features.enter()
		.append("path")
			.attr('class', 'arrondissement')
			.attr('fill', function(d) {
				return colorScale(+d.properties.code);
			})
	  	.attr("d", path)
});

$.get('maladie/projects', function(data) {
	data = JSON.parse(data);
	data.forEach(function(obj) {
		for(var key in obj) {

		}
	});
});

function draw_commune(nb_maladie) {

}