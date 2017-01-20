/*****************************************************************************
*  todo:
*
*  - interpolation between previous data and next data, check map vs forEach |***------|
*  - multifoci for different node groups |**--------|
*  -
*  - adding and removing nodes  |********--|
*  - adding and removing links  |***-------|


*  concepts to grasp :
*  - verlet integration and alpha value
*  - tick() frequency, alpha - cooling down relation
*  - multifoci drawing, coordinate system in svg drawings

******************************************************************************/

const d3 = require('d3');
require('./pipes.js')
const w = 1000;
const h = 600;

var nodes = elements.nodes.map(node => node.data)
var links = elements.edges.map(edge => edge.data)


/*****************************************************************************

There are a few examples about multifoci force layout

for the fixed one : http://bl.ocks.org/mbostock/1021953
based on alpha value : http://bl.ocks.org/mbostock/1021841

******************************************************************************/

var focis = [];

mergeData();
filterNodes();

var nCounter = nodes.length;

var link, node, label, parents;
var theta = 2 * Math.PI / nodes.length;
var r = 200;

var animating = true;
var animationStep = 100;

var svg = d3.select("#chartArea")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody()
        .strength(-3000))
    .force("link", d3.forceLink(links)
        .id(function(d) {
            return d.id;
        })
        .distance(30)
        .strength(1))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(0.1)
    .on("tick", ticked)

var g = svg.append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

parent = g.append("g").selectAll("rect")


link = g.append("g")
    .attr("class", "links")
    .selectAll("line")

node = g.append("g")
    .attr("stroke-width", 1.5)
    .attr("class", "nodes")
    .selectAll("circle")

label = g.selectAll("text")
    .attr("class", "label")

var addButton = d3.select("#add")
    .on("click", addNode)

var removeButton = d3.select("#remove")
    .on("click", removeNode);

var stopButton = d3.select("#stop")
    .on("click", stop);

updateData();

d3.interval(function() {
    // renew the bitrate data randomly
    if (animating) {
        console.log("inside");
        console.log(nodes[1]);
        nodes.forEach(function(n) {
            n.bitrate = Math.round(Math.random() * 10000)
        })
        console.log(nodes[1]);
        updateData();
    }
}, 2000)

function updateData() {

    /* Bind data to links, overwrite the handler. in article below, mike bostock explains
     * some key issues related with update & enter process
     * https://medium.com/@mbostock/what-makes-software-good-943557f8a488#.ja93u2jtq
     */

    link = link.data(links, function(d) {
        return d.id
    })
    link.exit().remove();

    link = link.enter()
        .append("line")
        .merge(link);

    link.transition(2000)
        .attr("stroke", function(d) {
            if (d.target.bitrate > d.source.bitrate) {
                return "green"
            }
        })

    label = label.data(nodes)
    label.exit().remove();

    label = label.enter()
        .append("text")
        .merge(label);

    label.transition(2000)
        .text(function(d) {
            return d.name;
        })


    /*****************************************************************************

    Here is the method AmeliaBR proposed in order to savre previous data as a property
    of the selection :

    selection = selection.property(" __oldData__", function(d){ return d; } );
                            //store the old data as a property of the node
                        .data(newData, dataKeyFunction);
                            //over-write the default data property with new data
                            //and store the new data-joined selection in your variable


    There are some issues:

    ******************************************************************************/

    node = node.property("__oldData__", function(d){
        return d
    });

    node = node.data(nodes, function(d) {
        return d.id
    })
    node.exit().remove();

    node = node.enter()
        .append("circle")
        .merge(node);

    node.on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(d3.drag().on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )
        .transition(2000)
        .attr("r", 10)
        .attr("stroke-width", function(d, i) {

            if (this.__oldData__) {

                var prev = this.__oldData__
                var next = d;

                console.log("inside")
                console.log(prev);
                console.log(next);
                if (next.bitrate > prev.bitrate)
                    return 20;
            }
        })

    // restart the simulation with updated values;

    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(0.1).restart();
}

function stop() {
    simulation.stop()
    var animating = false;
}

function mergeData() {

    nodes.forEach(function(n) {

        if (!n.receivesFrom || !n.sendsTo) {

            links.forEach(function(l) {

                if (l.source === n.id) {
                    n.sendsTo = l.target
                }

                if (l.target === n.id) {
                    n.receivesFrom = l.source
                }
            })

        }
    })

}

function refreshLinks() {

    links.forEach(function(l) {

    })

    nodes.forEach(function(n) {

        if (n.related) {

            var relTargets = nodes.filter(function(t) {

                if (t.receivesFrom === n.sendsTo) {
                    var newLink = {

                        id: n.id + "-connect-" + t.id,
                        target: t.id,
                        source: n.id

                    };

                    links.push(newLink)
                    return true;
                }
            })

            var relSources = nodes.filter(function(t) {

                if (t.sendsTo === n.receivesFrom) {

                    var newLink = {

                        id: t.id + "-connect-" + n.id,
                        target: n.id,
                        source: t.id
                    }

                    links.push(newLink)
                    return true
                }
            })
        } else {
            console.log("new node is not related")
        }
    })
}

function addNode() {

    var newNode = new Node();
    console.log(newNode);
    nCounter++;
    nodes.push(newNode);

    refreshLinks();
    updateData();
}

function removeNode() {
    nCounter--;
    nodes.pop();
    refreshLinks();

}

function filterNodes() {

    parents = nodes.filter(function(d) {
        return !d.parent;
    })

    nodes = nodes.filter(function(d) {
        return d.parent;
    })

}

function dragstarted(d) {

    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.select(this).raise().classed("active", true);
}

function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.select(this).classed("active", false);
    simulation.restart();
}

function mouseover() {
    var d = d3.select(this)
    d.transition(1000)
        .attr("r", 20)
        .attr("fill", "orange")
    simulation.stop();
}

function mouseout(d) {

    d3.select(this).transition(1000)
        .attr("r", 10)
        .attr("fill", "grey");
    simulation.restart();

}

function ticked(e) {

    // in order to add some smoothness, transition and linear ease is needed

    link.attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        })

    /* for multifoci force layout, doesn't work due to hardcoded coordinates,
    needs to be fixed by replacing them with alpha based parameter

          nodes.forEach(function(o, i) {
            var a = (o.parent).slice(-1);
             o.y += a & 1 ? 3 : -3;
             o.x += a & 2 ? 3 : -3;
           });

    */
    node.transition().ease(d3.easeLinear).duration(animationStep)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })

    label.transition().ease(d3.easeLinear).duration(animationStep)
        .attr("x", function(d) {
            return d.x + 10;
        })
        .attr("y", function(d) {
            return d.y;
        })

    //simulation.stop();

}

// for generating random ids for each node
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4();
}


//link constructor
function Link() {

    this.id = params.id;
    this.source = params.source;
    this.target = params.target;
}
// node constructor
function Node(params) {

    if (params) {

        this.parent = params.parent;
        this.id = params.id;
        this.name = params.name;
        this.child = false;
        this.related = false;
        this.sendsTo = params.sendsTo;
        this.receivesFrom = params.receivesFrom;

    } else {

        this.id = guid(),
            this.name = "node #" + nCounter,
            this.bitrate = Math.round(Math.random() * 10000)
        this.receivesFrom = (nodes[Math.round(Math.random() * nodes.length)]),
            this.sendsTo = (nodes[Math.round(Math.random() * nodes.length)]),
            this.parent = "org.pipeline." + Math.round(Math.random() * 4)

    }
    if (this.parent) {
        this.child = true;
    }

    if (this.sendsTo || this.receivesFrom) {
        this.related = true;
    }
}
