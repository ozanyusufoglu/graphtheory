const d3 = require('d3');
require('../pipes.js');
var smooth = 1000;
var period = 100;

  var dataset = [{
        foo: 20,
        boo: 30,
        dada: 40
    },
    {
        foo: 20,
        boo: 30,
        dada: 40
    },
    {
        foo: 20,
        boo: 30,
        dada: 40
    }
];
var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select("#chartarea").append("svg")
    .attr("width", 1000)
    .attr("height", 1000)

var circles = svg.selectAll("circles")

setInterval(function(){

    dataset.forEach(function(e){
      e.foo = Math.floor( Math.random()*100);
    })
    if(dataset.length< 15){

    dataset.push({
        foo: 20,
        boo: 30,
        dada: 40
    });
 }
    update();
    console.log(circles);
},period);

function update(){

 //circles = circles.exit().remove();

 circles.data(dataset).enter()
          .append("circle")
          .transition().ease(d3.easeLinear).duration(smooth)
          .attr("r", function(d){return d.foo})
          .attr("fill", function(d,i){return color(i)})
          .attr("cx", function(d){ return Math.random() * d.foo * 20 })
          .attr("cy", function(d){return Math.random() * d.foo * 20 })

  //  circles = circles.merge(circles);
}
