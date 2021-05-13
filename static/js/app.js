// initialize page with default value
path = "data/samples.json"
function init() {
    d3.json(path).then(function (data) {
        // console.log(data);
        // populate the dropdown with entry corresponding to key value "names"
        var dropdownMenu = d3.select("#selDataset");;

        data.names.forEach((d) => {
            var option = dropdownMenu.append("option");
            var val = option.append("value");
            val.text(d);
        });

        var UserSel = dropdownMenu.node().value


        // generate  demo data based on default value from the json file.
        var demoData = data.metadata.filter(d => d.id == parseInt(UserSel))[0]
        // console.log(demoData)
        // find where the demogrpahic data is going, and then populate as a list
        var demoText = d3.select("#sample-metadata");;

        Object.entries(demoData).forEach(([key, value]) => {
            var option = demoText.append("ul");
            var item = option.append("li");
            item.text(`${key}: ${value}`);
        });

        //filter based on the user selection
        var subjData = data.samples.filter(d => d.id === UserSel)[0]

        //sort by sample_values
        var subjList = []    // https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way
        for (var j = 0; j < subjData.sample_values.length; j++) {
            subjList.push({
                'sample_values': subjData.sample_values[j],
                'otu_ids': subjData.otu_ids[j],
                'otu_labels': subjData.otu_labels[j]
            });
        }
        //slice for top 10
        var chartData = subjList.sort((a, b) => b.sample_values - a.sample_values).slice(0, 10)


        // 2 Set up trace and plot horizontal bar
        trace1 = {
            x: chartData.map(d => d.sample_values),//sample_values,
            y: chartData.map(d => d.otu_ids),//otu_ids,
            type: "bar",
            orientation: "h",
            text: chartData.map(d => d.otu_labels),//otu_labels,
            mode: "bar+text"
        }

        var data1 = [trace1];
        var layout1 = {
            title: "Horizontal Bar - Top 10 OTUs",
        };
        Plotly.newPlot("bar", data1, layout1);
        // Bubble Plot
        trace2 = {
            x: chartData.map(d => d.otu_ids),//otu_ids,
            y: chartData.map(d => d.sample_values),//sample_values,
            text: chartData.map(d => d.otu_labels),//otu_labels,
            marker: {
                size: chartData.map(d => d.sample_values),
                color: chartData.map(d => d.otu_ids)
            },
            mode: "markers"
        }

        var data2 = [trace2];
        var layout2 = {
            title: "Bubble- Top 10 OTUs",
        };
        Plotly.newPlot("bubble", data2, layout2);

    })
};
// based on user selection, function optionChanged will update the page
// now that user has picked subjectID, 
// clear/recreate demographic info and
// restyle the charts.
function optionChanged(subjectID) {
    
    // Capture user's selection from the dropdown
    UserSel = d3.select("#selDataset").node().value
    d3.json(path).then(function (data) {
        //filter based on the user selection
        var subjData = data.samples.filter(d => d.id === UserSel)[0]

        //sort by sample_values
        var subjList = []    // https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way
        for (var j = 0; j < subjData.sample_values.length; j++) {
            subjList.push({
                'sample_values': subjData.sample_values[j],
                'otu_ids': subjData.otu_ids[j],
                'otu_labels': subjData.otu_labels[j]
            });
        }
        //slice for top 10
        var chartData = subjList.sort((a, b) => b.sample_values - a.sample_values).slice(0, 10)
        
        //restyle the bar
        var barx = chartData.map(d => d.sample_values)
        var bary = chartData.map(d => d.otu_ids)
        var bartext = chartData.map(d => d.otu_labels)
        Plotly.restyle(d3.selectAll("#bar").node(), "x", [barx])
        Plotly.restyle(d3.selectAll("#bar").node(), "y", [bary])
        Plotly.restyle(d3.selectAll("#bar").node(), "text", [bartext])
        
        //restyle the bubble
        var bubx = chartData.map(d => d.otu_ids)//otu_ids,
        var buby = chartData.map(d => d.sample_values)//sample_values,
        var bubText = chartData.map(d => d.otu_labels)//otu_labels,
        var bubMarker = {
            size: chartData.map(d => d.sample_values),
            color: chartData.map(d => d.otu_ids)
        }
        Plotly.restyle(d3.selectAll("#bubble").node(), "x", [bubx])
        Plotly.restyle(d3.selectAll("#bubble").node(), "y", [buby])
        Plotly.restyle(d3.selectAll("#bubble").node(), "text", [bubText])
        Plotly.restyle(d3.selectAll("#bubble").node(), "marker", [bubMarker])
        
        //change the demographic info
        d3.select("#sample-metadata").html("")
        var demoData = data.metadata.filter(d => d.id == parseInt(UserSel))[0]
        console.log(demoData)
        var demoText = d3.select("#sample-metadata");;

        Object.entries(demoData).forEach(([key, value]) => {
            var option = demoText.append("ul");
            var item = option.append("li");
            item.text(`${key}: ${value}`);
        });
    })

}



// Promise Pending
const dataPromise = d3.json(path);
console.log("Data Promise: ", dataPromise);

init();