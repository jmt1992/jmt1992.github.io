(function () {
    var myConnector = tableau.makeConnector();

   myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "client_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "delta_score",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "new_score",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "new_tier",
        dataType: tableau.dataTypeEnum.float
    },
		{
        id: "old_score",
        dataType: tableau.dataTypeEnum.float
    },
		{
        id: "old_tier",
        dataType: tableau.dataTypeEnum.float
    }
	
	];

    var tableSchema = {
        id: "DataSet",
        alias: "Client Dataset Description",
        columns: cols
    };

    schemaCallback([tableSchema]);
};


myConnector.getData = function(table, doneCallback) {
           //$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
        $.getJSON("http://13.56.140.223:8888/v1/perturbation?features=feat1,feat2&shifts=1,2&countries=US,DE", function (resp) {
            // var feat = resp, //shouldnt need to go to the features sublevel
            tableData = [];

            // Iterate over the JSON object hard coded to test
            //for (var i = 0, len = feat.length; i < len; i++) {
            for (var i = 0, len = resp.length; i < len; i++) {

                tableData.push({
                    "client_id": resp[i].attributes.client_id,
                    "delta_score": resp[i].attributes.delta_score,
                    "new_score": resp[i].attributes.new_score,
                    "new_tier": resp[i].attributes.new_tier,
                    "old_score": resp[i].attributes.old_score,
                    "old_tier": resp[i].attributes.old_tier

                });
            }

        table.appendRows(tableData);
        doneCallback();
    });
};


    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Client Data Connection";
        tableau.submit();
    });
});

