queue()
	.defer(d3.json, "maladie/projects")
	.defer(d3.json, "d3_geo_french/france-geojson/departements/69/communes.geojson")
	.await(makeGraphs);

function makeGraphs(error, projectsJson, statesJson) {

}