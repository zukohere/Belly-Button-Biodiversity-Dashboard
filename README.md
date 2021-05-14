# plotly-challenge
Repo for HW 15
Deployed at: https://zukohere.github.io/plotly-challenge/

This assignment creates an interactive dashboard by subject for measurements associated with a study of biodiversity in the human navel. A dropdown menu by subject id populates a list of demographic info as well as visualizations associated with the study data.

One interesting coding concept of note. Though the sample_values appear to be sorted, I explored methods to ensure this assumption. However, the initial structure within the json file did not readily lend itself to be sorted (ie. if one field gets sorted, what guarantee do I have that another field will have its corresponding values sorted along with it?). The initital structure was:\
{\
    <p> id: <subject_id>,</p>
    <p> field0: [value_0,value_1, value_2, value_3,...,id_n],</p>
    <p> field1: [id_0, id_1, id_2, id_3,...,id_n],</p>
    <p> field2: [label_0, label_1, label_2, label_3,...,label_n]</p>
}\
\
The sorting method I'm most familiar with deals with record-style sorting, so I restructured the data using a for loop that gave the data the following structure:\
my_array = [\
    <p> {</p>
    <p> id: <subject_id>,</p>
    <p> field0: value_0,</p>
    <p> field1: id_0,</p>
    <p> field2: label_0</p>
    <p> },</p>
    <p> {</p>
    <p> id: <subject_id>,</p>
    <p> field0: value_1,</p>
    <p> field1: id_1,</p>
    <p> field2: label_1</p>
    <p> },</p>
    <p> ...,</p>
    <p> {</p>
    <p> id: <subject_id>,</p>
    <p> field0: value_n,</p>
    <p> field1: id_n,</p>
    <p> field2: label_n</p>
    <p> }</p>
]\
\
This enabled the data to be sorted using sort((a, b) => b.<some_field> - a.<some_field>)