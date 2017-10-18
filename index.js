/*The first SVG is selected, margins and width and height are defined*/

var svgFlights = d3.select(".intflights"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svgFlights.attr("width") - margin.left - margin.right,
    height = +svgFlights.attr("height") - margin.top - margin.bottom;

/*Variables for the x and y axis are created by using the created 'width' and 'height' variables. scaleBand and scaleLinear are used to
compute the position and transformation of the data points: http://d3indepth.com/scales/ */

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

/*"G" is added onto the first svg, by altering 'g' you can change the behavior of the (parts of the) svg.
The margins from the 'margin' object are added onto the svg, by adding a transform to 'g'.*/

var g = svgFlights.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*d3.text is used to load in a .csv file. This is purposely done, so that some cleaning can be done. Function onload is called.*/

d3.text('data3.csv').mimeType('text/plain;charset=iso88591').get(onload);

/*The .csv file is cleaned by getting rid of the header, the semicolons are replaced with commas.
The words 'number' and the actual numbers (e.g. 1.4) are effectively removed by replacing them with nothing*/

function onload(err, doc) {
  if (err) throw err;
     var header = doc.indexOf('ton')
    var end = doc.indexOf('\n', header)
    doc = doc.slice(end).trim()
    doc = doc.replace(/number/g, '')
    doc = doc.replace(/;/g, ',')
    doc = doc.replace(/\d\.\d /g, '') /*Thanks @wooorm*/

/*I'm storing the cleaned data in var cleanedData, each column from the dataset gets its own key.*/

    var cleanedData = d3.csvParseRows(doc, map)
    function map(d) {
    return {
      airport: d[0],
      year: Number(d[1]),
      intFlight: Number(d[2]),
      locFlight: Number(d[3]),
      totFlight: Number(d[4]),
      totArrive: Number(d[5]),
      totDepart: Number(d[6]),
      totPasseng: Number(d[7]),
      arrPasseng: Number(d[8]),
      dprPasseng: Number(d[9]),
      fromEurope: Number(d[10]),
      intercontPasseng: Number(d[11]),
      fromAfrica: Number(d[12]),
      fromAmerica: Number(d[13]),
      fromAsia: Number(d[14]),
      totalCargo: Number(d[15])
    }
  }

/*The footer is taken out of cleanedData, preventing an empty object from being returned.*/

    var cyaFooter = cleanedData.indexOf('� Statistics Netherlands, Den Haag/Heerlen 11-10-2017');
    var remove = cleanedData.splice(cyaFooter); /*Thanks @DesleyAalderink*/

/*I'm filtering the cleaned data per airport, and storing the data for each airport in a different variable. A very dodgy way of doing it,
but hey, it works.*/

    var cleanedDataAMS = cleanedData.filter(function(d) { return d.airport == "Amsterdam Airport Schiphol" })
    var cleanedDataEND = cleanedData.filter(function(d) { return d.airport == "Eindhoven Airport" })
    var cleanedDataMST = cleanedData.filter(function(d) { return d.airport == "Maastricht Aachen Airport" })

/*Using the Amsterdam data by default, since that's what the selection is when you open the page.*/

    x.domain(cleanedDataAMS.map(function(d) { return d.year; }));
    y.domain([0, d3.max(cleanedDataAMS, function(d) { return d.intFlight; })]);

/*To allow for interactivity, we listen to the input (checkbox), whenever it changes the function onchange is called*/

  d3.select('input').on('change', onchangeSort);

  function onchangeSort() {

    /*If the checkbox is checked, function sortOnAmount is called. Otherwise, sortonCause is called.*/

    var sort = this.checked ? sortOnAmount : sortOnYear;
    var x0 = x.domain(cleanedData.sort(sort).map(year)).copy();
    var transition = svgFlights.transition();

    /*Bars are sorted.*/
    svgFlights.selectAll('.bar').sort(sortBar);

    /*The transition is added to actually see the bars move.*/
    transition.selectAll('.bar')
      .delay(delay)
      .attr('x', barX0);

    /*This transition makes the labels move as well.*/
    transition.select('.axis--x')
      .call(d3.axisBottom(x))
      .selectAll('g')
      .delay(delay);

    /*This is the part that actually calculates how the bars need to be sorted, and how they should be moved.*/

    function sortBar(a, b) {
      return x0(year(a)) - x0(year(b));
    }

    function barX0(d) {
      return x0(year(d));
    }

    function delay(d, i) {
      return i * 50;
    }
  }

/*We also listen to the dropdown for the first svg, and call the onchangeFilter function when something changes.*/

  d3.select('select').on('change', onchangeFilter);

  function onchangeFilter() {

    var transition = svgFlights.transition();

    field = this.value;

/*Using if statements, I check which option from the dropdown is selected, remove the current bars and create new ones by joining pre-filtered
data that we previously stored in three different variables. THERE IS A BUG HERE: I'm aware of this. This is by far not the best way of doing it,
besides that, it also breaks the sort function. The sort does work for the Amsterdam values (since that's the one that's loaded in by default),
but when a new airport is selected the sort will still be based on the Amsterdam values. I found this out too late to be able to change it
still, but wanted to point this out.*/

      if (field == "Amsterdam Airport Schiphol") {
          g.selectAll(".bar").remove()
          g.selectAll(".bar")

    .data(cleanedDataAMS)
    .enter().append("rect") /*For every datapoint, a new rectangle is added to the SVG.*/
      .attr("class", "bar") /*A class by the name of bar is added to each rectangle, this can be edited in the css file.*/
      .attr("x", function(d) { return x(d.year); }) /*The x position is determined by the entry in the CSV file*/
      .attr("y", function(d) { return y(d.intFlight); }) /*The y position is determined by the entry in the CSV file*/
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.intFlight); });
      }

       if (field == "Eindhoven Airport") {
          g.selectAll(".bar").remove()
          g.selectAll(".bar")

    .data(cleanedDataEND)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("y", function(d) { return y(d.intFlight); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.intFlight); });
      }

       if (field == "Maastricht Aachen Airport") {
          g.selectAll(".bar").remove()
          g.selectAll(".bar")

    .data(cleanedDataMST)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("y", function(d) { return y(d.intFlight); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.intFlight); });
      }
  }

  /*This is where the axis--x and axis--y class are created, so that they can be used for e.g. transitions.*/

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "s"))


/*This is where the bars that you first see are created (Amsterdam by default).*/

  g.selectAll(".bar")
    .data(cleanedDataAMS)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("y", function(d) { return y(d.intFlight); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.intFlight); });

    function delay(d, i) {
    return i * 10;
  }

/*This is where the second svg is made, for the pie chart, in a similar way to the first. Notice how a radius is created too.*/

var svgCountry = d3.select(".country"),
margin2 = {top: 50, right: 20, bottom: 50, left: 40},
width2 = +svgCountry.attr("width") - margin2.left - margin2.right,
height2 = +svgCountry.attr("height") - margin2.bottom - margin2.top,
radius = Math.min(width2, height2) / 2,
g2 = svgCountry.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.locFlight; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius + 30)
    .innerRadius(radius + 30);

/*1997 is the default option (upon landing) so I'm filtering the cleaned data to all entries belonging to 1997.*/

var cleanedDatatime = cleanedData.filter(function(d) { return d.year == "1997" })

/*This is where the pie and its labels are made.*/

var arc = g2.selectAll(".arc")
    .data(pie(cleanedDatatime))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.locFlight); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .attr("dx", "5em")
      .text(function(d) { return d.data.airport.concat(": ", d.data.locFlight, " local flights"); });

/*Now we listen to the second dropdown, the one for the pie chart, and run onchangeTime when anything is changed.*/

d3.select('.selectyear').on('change', onchangeTime);

function onchangeTime(){
            field2 = this.value;

            /*I'm filtering the cleaned data to the entries with the year that's selected in the dropdown. I'm also making sure that
            entries with no local flights are filtered out, to prevent 'empty slices' from being created.*/

            var cleanedDatatime2 = cleanedData.filter(function(d) { return d.year == field2 && Number(d.locFlight) != 0 })

            /*The currently existing pie slices are removed, new ones are created with the newly filtered data.*/

            g2.selectAll(".arc").remove()


            var arc2 = g2.selectAll(".arc")
            .data(pie(cleanedDatatime2))
            .enter().append("g")
            .attr("class", "arc")

            arc2.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.locFlight); });

            arc2.append("text")
            .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
            .attr("dy", "0.35em")
            .attr("dx", "5em")
            .text(function(d) { return d.data.airport.concat(": ", d.data.locFlight, " local flights"); });
    }
};


/*These are the functions that are used by the sorting checkbox, they calculate which values should go first.
The functions intFlight and year make d.intFlight and d.year approachable by parts of the code that don't have the 'd' parameter
or want to pass a parameter onto d.intFlight and d.year*/

function sortOnAmount(a, b) {
  return intFlight(b) - intFlight(a);
}

function sortOnYear(a, b) {
  return d3.ascending(year(a), year(b));
}

function intFlight(d) {
  return d.intFlight;
}

function year(d) {
  return d.year;
}


/* Bar Chart parts taken from: https://bl.ocks.org/mbostock/3885304
Pie Chart parts taken from: https://bl.ocks.org/mbostock/3887235
Sort functionality parts from: https://github.com/cmda-fe3/course-17-18/blob/master/site/class-4/sort/index.js
Filter functionality parts from: https://github.com/cmda-fe3/course-17-18/blob/master/site/class-4/axis/index.js
Parts of https://docs.google.com/presentation/d/1TpoPilc1qVIQU07u_IdPeNqSZcbgliPaLF0zZUWGvWE/ were used for csv editing*/
