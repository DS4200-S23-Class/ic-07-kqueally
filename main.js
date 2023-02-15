const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50};

// Let's make a vis with the following data
const data = [55000, 48000, 27000, 66000, 90000];

// We would need an extremely large screen to use data2 values
// as our cx values. In order for our vis to work on (almost)
// any screen, we need to be able to map (i.e. scale) our data
// values to pixel values.

// Start with a new frame. This time, we will also set a constant
// for the width and height of our vis
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME3 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Now, let's define our scaling function

// find max X
const MAX_Y = d3.max(data, (d) => { return d; });
console.log("Max y: " +MAX_Y);

// Now, define scale functions that maps our data values
// (domain) to pixel values (range)
const Y_SCALE = d3.scaleLinear() // linear scale because we have
                              // linear data
                  .domain([0, MAX_Y * 1.1]) // add some padding
                  .range([0, VIS_WIDTH]);

console.log("Input: 90000, Y_SCALE output: " + Y_SCALE(90000));

// Now, we can use X_SCALE to plot our points
FRAME3.selectAll("points")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", 200)
      .attr("cy", (d) => { return (Y_SCALE(d) + MARGINS.top); })
      .attr("r", 10)
      .attr("class", "point");

// We can also use X_SCALE to add an axis to the vis
FRAME3.append("g") // g is a "placeholder" svg
      .attr("transform", "translate(" + MARGINS.left +
            "," + MARGINS.top + ")") //moves axis
                                                    // within margins
      .call(d3.axisLeft(Y_SCALE).ticks(6)) // function for generating axis
        .attr("font-size", '20px'); // set font size
