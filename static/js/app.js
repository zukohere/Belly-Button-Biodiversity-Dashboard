// initialize page with default value
path = "data/samples.json"
function init(){d3.json(path).then(function(data) {
    // console.log(data);
    // populate the dropdown with entry corresponding to key value "names"
    var dropdownMenu = d3.select("#selDataset");;
    
    data.names.forEach((d) => {
        var option = dropdownMenu.append("option");
        var val = option.append("value");
        val.text(d);
        });
    
    var UserSel = dropdownMenu.node().value
    
    //filter based on the user selection
    var subjData = data.samples.filter(d => d.id===UserSel)[0]
    //sort by sample_values
    var subjList = []    // https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way
    for (var j = 0; j < subjData.sample_values.length; j++) {
        subjList.push({'sample_values': subjData.sample_values[j], 
                    'otu_ids': subjData.otu_ids[j],
                    'otu_labels': subjData.otu_labels[j]
        });
    }
    //slice for top 10
    var chartData = subjList.sort((a, b) => b.sample_values - a.sample_values).slice(0,10)

    // generate  demo data based on default value from the json file.
    var demoData = data.metadata.filter(d=>d.id==parseInt(UserSel))
    console.log(demoData)
    



    // 2 Set up trace and plot horizontal bar
    trace1 = {
        x: chartData.map(d=>d.sample_values),//sample_values,
        y: chartData.map(d=>d.otu_ids),//otu_ids,
        type: "bar",
        orientation: "h",
        text: chartData.map(d=>d.otu_labels),//otu_labels,
        mode: "bar+text"
    }

    var data1 = [trace1];
    var layout1 = {
        title: "Horizontal Bar - Top 10 OTUs",
      };
      Plotly.newPlot("bar", data1, layout1);
      // Bubble Plot
      trace2 = {
        y: chartData.map(d=>d.sample_values),//sample_values,
        x: chartData.map(d=>d.otu_ids),//otu_ids,
        text: chartData.map(d=>d.otu_labels),//otu_labels,
        marker:{ size: chartData.map(d=>d.sample_values),
                color: chartData.map(d=>d.otu_ids)},
        text: chartData.map(d=>d.otu_labels),//otu_labels,
        mode: "markers"
    }

    var data2 = [trace2];
    var layout2 = {
        title: "Bubble: Top 10 OTUs",
      };
      Plotly.newPlot("bubble", data2, layout2);
    
})
};
// based on user selection, function optionChanged will update the page
    // now that user has picked subjectID (value from selectData), 
    // create demo text not table (or clear, then recreate)
    // restyle the charts.
function optionChanged(subjectID){}

//PREVENT REFESH OF PAGE using d3.event.preventDefault();

//path is data/samples.json
// d3.json(path).then(function(data) {
//     console.log(data);
    
//     // Select dropdown
//     d3.select("#selDataset").on("change", optionChanged())
    
    
        // update bar chart
    
    // Set a variable for onchange, with the id

    // Select demographic info 

    // Display demographic info (loop through metadata) (clear old, show new)

    // 1 Select horiz bar ("bar")


    //3 Display and update  horiz bar


    // Display a bubble chart using 1,2,3 above similiarly for id = "bubble"








// });
  
  // Promise Pending
  const dataPromise = d3.json(path);
  console.log("Data Promise: ", dataPromise);

init();