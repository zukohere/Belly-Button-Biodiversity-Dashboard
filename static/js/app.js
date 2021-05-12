// initialize page with default value
function init(){
    // generate charts and demo data based on default value from the json file.
    // populate the dropdown with entry corresponding to key value "names"
}

// based on user selection, function optionChanged will update the page
    // now that user has picked subjectID (value from selectData), 
    // create demo text not table (or clear, then recreate)
    // restyle the charts.
function optionChanged(subjectID){}

//path is data/samples.json
d3.json(url).then(function(data) {
    console.log(data);
    
    // Select dropdown
    d3.select("#selDataset").on("change", optionChanged())
    
    
        // update bar chart
    
    // Set a variable for onchange, with the id

    // Select demographic info 

    // Display demographic info (loop through metadata) (clear old, show new)

    // 1 Select horiz bar ("bar")

    // 2 Set up bar trace
    Step_1_2_Trace = {
        x: //sample_values,
        y: //otu_ids,
        text: //otu_labels,
        type: "bar",
        orientation: "h",
        //hovertemplate: '<i>otu_labels</i>: $%{text}'
    }
    //3 Display and update  horiz bar


    // Display a bubble chart using 1,2,3 above similiarly for id = "bubble"








});
  
  // Promise Pending
  const dataPromise = d3.json(url);
  console.log("Data Promise: ", dataPromise);

init();