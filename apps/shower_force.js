const d3 = require('d3');
require('./logger');
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

var svg = d3.select("body").append("svg")
    .attr("width", 2000)
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
},1000);

function update(){

 //circles = circles.exit().remove();

 circles.data(dataset).enter()
          .append("circle")
          .transition().ease(d3.easeLinear).duration(1000)
          .attr("r", function(d){return d.foo})
          .attr("fill", function(d,i){return color(i)})
          .attr("cx", function(d){ return Math.random() * d.foo * 20 })
          .attr("cy", function(d){return Math.random() * d.foo * 20 })

  //  circles = circles.merge(circles);
}
