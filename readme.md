# Assessment 3: Multiple interactive visualisations 📊

This assessment is all about using a dirty dataset and making multiple interactive datavisualisations using that dataset.

## Background

[The assessment](https://github.com/cmda-fe3/course-17-18/tree/master/assessment-3) is part of the course 'Front-end development 3', which is part of the study 'Communication and Multimedia Design'. The course is focused on teaching the students how to visualize data with d3.js, this assessment is one of the things that the student will be judged on.

Dirty data has to be visualized. 'Dirty' data is data that cannot instantly be interpreted by d3. D3 can understand 'clean' TSV/CSV/JSON, datasets that aren't laid out in this format have to be adjusted in order to be used. This could of course be done by hand, but if you'd like to use a different dataset from the same source you'd have to do the work all over. By doing this 'adjusting' in the .js file, you can simply drop in a new dataset and it will work straight away. 'Adjusting' in JavaScript also helps with bigger datasets, manually adjusting 10000 entries will take longer than getting JavaScript to do it for you.

## Process

This section of the readme will show you how my final code came to be.

* The first step of the process was picking the data. My process was (once again) dictated by time. I did not have much of it. As part of Assessment 2, I figured out how to clean up CBS datasets. I knew that picking another CBS dataset would be the best/easiest way (for me) to get this assessment done, so I looked through most of them and ended up on this one: [Dataset](http://statline.cbs.nl/Statweb/publication/?VW=T&DM=SLEN&PA=37478ENG&D1=0-2,5,8,11,14,17,21,24-25,31,35,42&D2=1,3-4&D3=0-1,18,35,52,69,86,103,120,137,154,171,188,205,222,239,256,273,290,307&HD=171018-2249&LA=EN&HDR=T&STB=G1,G2)

* During class, I came up with some concepts. I really wanted to make a multi-line chart similar to the [Clean assignment](https://github.com/cmda-fe3/course-17-18/blob/master/class-3.md#clean), where each line represents an airport, and by using a dropdown as a filtering means you can change what's shown on the y-axis. I spent a lot of hours trying to make that work, with this being what it looked like before I gave up. I had everything working, up to the point where the graph needed to (visually) update. I just couldn't get it to work. The second visualisation was supposed to be a world map, that shows the percentage of passengers from each continent (as seen on the dataset).

![Where I gave up](https://i.gyazo.com/34ac65f5a7ee70561a507b4e73123fa0.png)

* This meant that I had to pick something else, something easier. During [class](https://github.com/cmda-fe3/course-17-18/blob/master/site/class-4/axis/index.js) we were taught how to filter bar charts - for [Assessment 2](https://jensorsel.github.io/fe3-assessment-2/) I already sorted a bar chart. I knew that in order to finish this assessment at all, I had to combine these. So that's what I did. I took my Assessment 2 code, altered it where needed, and started trying to fit in the filtering functionality. I tried my best to copy the (good) way that was used during class - however I just couldn't make that work either. After more hours of frustration I knew I was going to make [certain people](https://github.com/wooorm) very unhappy with some very ugly code (see the .js file). At least, the filtering worked. But of course, we're in the world of coding and we just can't have nice things. I'll elaborate on this in the section **Bug**. I put the amount of international flights on the y-axis, I thought this would be the most interesting thing to see visualised.

* So now it's time for the world map! ... or not. By the time I managed to get the first visualisation working, I only had a small part of an evening left to get the second one working. I knew that a pie chart would be the simplest way of getting what I wanted out of the world map. This actually posed more of a challenge than I thought it'd be, because somehow I had never made a pie chart in d3 before. This also made it so that I couldn't do what I wanted to. I wanted to make three pie charts in a row, one for each airport, showing the percentages of where passengers come from. I just didn't know how to make different values in the dataset into different slices - the [example](https://bl.ocks.org/mbostock/3887235) uses two variables (age and population) where I'd need to use more. If we were able to make our own .csv files I believe it would have been possible, unfortunately we had to use dirty data. This resulted in me just showing the amount of local flights per airport (each airport as a slice). I added (once again, very ugly) filtering interactivity to make the user pick between years. I had some issues with the way the labels were put on top of the slices, since my labels are quite long they ended up 'underneath' the slice that came next ([screenshot](https://i.gyazo.com/c37b9a9eb8e0065d495831b765314971.png)). I fixed this by adding a `dx` attribute to the text. And that's basically it!

## Bug

## Sources and help

* [Assessment 2 sources](https://github.com/JensOrsel/fe3-assessment-2#sources-and-help) (since Assessment 3 was built from Assessment 2)
* [Pie chart](https://bl.ocks.org/mbostock/3887235)
* [Filter functionality](https://github.com/cmda-fe3/course-17-18/blob/master/site/class-4/axis/index.js) and [more on filter functionality](http://bl.ocks.org/jonahwilliams/2f16643b999ada7b1909)
* [Concat](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
* [Understanding filtering conditions](http://bl.ocks.org/d3noob/8dc93bce7e7200ab487d)
* [Understanding pie chart labels](http://jsfiddle.net/2uT7F/)
* [Multi-series line chart](https://bl.ocks.org/mbostock/3884955)



## License

Released under the GNU General Public License, version 3. (from [D3 Gallery: Bar Chart](https://bl.ocks.org/mbostock/3885304)
