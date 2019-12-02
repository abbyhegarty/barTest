var sampleData= [{name: "fred", rise: 12, run: 5, width: 6},
                {name: "sam", rise: 15, run: 7, width: 7},
                {name: "pebbles", rise: 18, run: 11, width: 9},
                {name: "barney", rise: 8, run: 15, width: 6},
                {name: "george", rise: 9, run: 17, width: 10},
                {name: "green", rise: 13, run: 19, width: 3},
                {name: "orange", rise: 5, run: 15, width: 2},
                {name: "red", rise: 3, run: 12, width: 1},
                {name: "yellow", rise: 1, run: 3, width: 5},
                {name: "purple", rise: 12, run: 7, width: 6},]



var setup = function(sampleData)
{
    var screen = {width: 800, height: 500}
    
    var margins = {top: 25, bottom: 35, left: 50, right: 25}
    
    var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom
    
    var xScale = d3.scaleLinear()
                    .domain([0,20])
                    .range([0, width])
    
    var yScale = d3.scaleLinear()
                    .domain([0,20])
                    .range([height-5,0])
    
    var rScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([0,50])
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    var svg = d3.select("body")
    .append("svg")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    svg.append("text")
    .attr("transform", "translate("+ (width/2)+","+(height+margins.top+30)+")")
    .style("text-anchor", "middle")
    .text("Horizontal Axis")
    
    svg.append("g")
    .attr("id","yAxis")
    .attr("transform","translate(35,"+margins.top+")")
    .call(yAxis);
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", (margins.left-55))
      .attr("x", 0-(height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Vertical Axis");     
    
    svg.append("g")
    .attr("id", "scatterplot")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(sampleData)
    .enter()
    .append("circle")
    
    drawCircles(sampleData, xScale, yScale, rScale, cScale)
    
}

var drawCircles = function(dataArray, xScale, yScale, rScale, cScale)
{
            d3.select("#scatterplot")        
            .selectAll("circle")
            .data(dataArray)
            //.enter()
            //.append("circle")
            .transition()
            .duration(1000)
            .attr("cx", function(d)
                 {return xScale(d.run)})
            .attr("cy", function(d)
                 {return yScale(d.rise)})
            .attr("r", function(d)
                 {return rScale(d.width)})
            .attr("fill", function(d)
                 {return cScale(d.name)})
}
