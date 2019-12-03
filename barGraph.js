 var sampleData= [{name: "grant", age: 21, toy: 25, home: 6},
                {name: "brooke", age: 18, toy: 10, home: 17},
                {name: "hannah", age: 18, toy: 11, home: 21},
                {name: "salma", age: 8, toy: 16, home: 6},
                {name: "lucia", age: 14, toy: 19, home: 10},
                {name: "john", age: 13, toy: 19, home: 3},
                {name: "mike", age: 5, toy: 19, home: 2},
                {name: "jessie", age: 3, toy: 12, home: 11},
                {name: "pat", age: 20, toy: 3, home: 25},
                {name: "ian", age: 12, toy: 7, home: 16},]



var setup = function(sampleData)
{
    
    var screen = {width: 800, height: 500}
    
    var margins = {top: 50, bottom: 35, left: 50, right: 25}
    
    var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom
    
    var xScale = d3.scaleLinear()
                    .domain([0,20])
                    .range([0, width])
    
     var xScale = d3.scaleBand()
      .range([0, width])
      .domain(sampleData.map(function(d) {return (d.name)}))
      .padding(0.4)
     
    var yScale = d3.scaleLinear()
                    .domain([0,30])
                    .range([height-5,0])
 
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    //axis
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
 
 //maybe some bars? 
  svg.append("g")
    .attr("id", "bar")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    d3.select("#bar")
    .selectAll("rect")
     .data(sampleData)
     .enter()
     .append("rect")
     .attr("x", function(d,i)
      { return i*70 +40;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
    .attr("y", function (d)
      { return height - yScale(d.age);})
    .attr("width", 40)
    .attr("height", function (d) 
         { return  yScale(d.age);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.run*20;})
    .attr("fill", "teal") 
    .style("opacity", .5) 
    
     svg.append("g")
    .attr("id", "bar1")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    d3.select("#bar1")
    .selectAll("rect")
     .data(sampleData)
     .enter()
    .append("rect")
     .attr("x", function(d,i)
      { return i*70 +40;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
    .attr("y", function (d)
      { return height - yScale(d.toy);})
    .attr("width", 20)
    .attr("height", function(d)
         { return yScale(d.toy);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.run*20;})
    .attr("fill", "red")
    
    
    


var drawLegend = function(sampleData)
{
 
  var width = 200;
  var height = 200;
  var boxWidth = 40; 
    
  d3.select("svg")
    .append("g")
    .attr("id","legend")
   .attr("width", width)
    .attr("height", height)
   // .attr("transform","translate(" +(screen.width-margins.right)+"," + (margins.top)+")"); 

var gs = d3.select("#legend")
    .selectAll("g")
    .data(sampleData)
    .enter()
    .append("g")
    .attr("fill",function(d)
         { return cScale(d.home);})
    .attr("transform",function(d,i)
    
    {
          return "translate(700,"+(i*15)+")"; //changing # will space each individual rect + text more
    })
  .attr("width", boxWidth)
    .attr("height", boxWidth-3)
    
    
gs.append("rect")
    .attr("width",10) //size of rectangles
    .attr("height",10)
   

gs.append("text")
    .text(function(d)
         { return d.home })
    .attr("x",15)
    .attr("y",10)
    .attr("fill",black)
    
 //kdeans   
/*var width = 200;
  var height = 200;
  var boxWidth = 15;
  var svg = d3.select(idname)
              .attr("height", height)
              .attr("width", width);
  svg.selectAll("rect")
     .data(colorData)
     .enter()
     .append("rect")
     .attr("x", function(d,i)
      { return 25;})
    .attr("y", function (d, i)
      { return (i+1)*15 + 10;})
    .attr("width", boxWidth)
    .attr("height", boxWidth-3)
    .attr("fill", function(d)
      { return d.color;})

svg.selectAll("text")
   .data(colorData)
   .enter()
   .append("text")
   .text(function(d)
      { return d.color;})
   .attr("x", function(d,i)
      { return 45})
   .attr("y", function(d, i)
      { return (i+1)*15 + 22;})
   .attr("fill", "black")
    */
    
}
drawLegend(sampleData,cScale)
}


setup(sampleData)
