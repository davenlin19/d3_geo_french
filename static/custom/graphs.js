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

function handler_zone_click(obj) {
	$('.content.nb-malade').html(obj.attr('nb_malades'));
}
