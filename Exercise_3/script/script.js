var margin ={t:20,r:120,b:20,l:20},
    width = $('.canvas').width()-margin.l-margin.r,
    height = $('.canvas').height()-margin.t-margin.b;

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width + margin.l + margin.r)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('transform','translate('+margin.l+','+margin.t+')');

d3.csv('data/world_bank_2013.csv',
    function(d){
        var newRow = {
            ctr: d.country,
            gdp: +d.GDP,
            gdpPerCap: +d.GDP_per_capita,
            pctUser: +d.internet_users_per_100
        };

        return newRow;
    },
    function(err,rows) {
        var minGdpPerCap = d3.min(rows, function (d) {
                return d.gdpPerCap;
            }),
            maxGdpPerCap = d3.max(rows, function (d) {
                return d.gdpPerCap;
            });

        var minPctUser = d3.min(rows, function (d) {
                return d.pctUser;
            }),
            maxPctUser = d3.max(rows, function (d) {
                return d.pctUser;
            });

        console.log(minGdpPerCap, maxGdpPerCap);
        console.log(minPctUser, maxPctUser);


        var scaleX = d3.scale.linear()
            .domain([minGdpPerCap, maxGdpPerCap])
            .range([0, width]);

        var scaleY = d3.scale.linear()
            .domain([minPctUser, maxPctUser])
            .range([height,0]);

        rows.forEach(function (country) {
            var xPos = scaleX(country.gdpPerCap),
                yPos = scaleY(country.pctUser);

            var node = canvas.append('g')
                .attr('class','country')
                .attr('transform','translate('+xPos+','+yPos+')')

            node
                .append('circle')
                .attr('r',country.gdp/95555000000)
                .style('fill','rgb(40,100,200)')
                .style('fill-opacity',.5);

            node
                .append('text')
                .style('font-size','10px')
                .style('fill','rgb(0,0,100)')
                .style('font-weight','thin')
                .text(country.ctr+" "+country.pctUser);


        })

        for(var x=0; x<width; x+=100){
            canvas
                .append('line')
                .attr('x1',x)
                .attr('x2',x)
                .attr('y1',0-margin.t)
                .attr('y2',height+margin.t)
                .style('stroke','rgb(80,80,80)')
                .style('stroke-width','1px');

           /*canvas
                .append('text')
                .attr('x',x)
                .attr('dy',0)
                .attr('text-anchor','middle')
                .style('font-size','8px')
                .text(x);*/



        }
    })




