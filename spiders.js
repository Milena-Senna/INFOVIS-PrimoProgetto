var idConf = 0
var config = readFileJson().config

//Cambia la posizione del ragno
function changePosition(config) {
    for (let index = 0; index < 10; index++) {
        if(d3.select("#spider" + index).attr("locked")!=1)
            d3.select("#spider" + index)
              .transition()  
              .attr("transform", "translate(" + setPosition(index, idConf).x + "," + setPosition(index, idConf).y + ")")

    }
};


function animate(){                        
    if (idConf===4) {
            idConf = 0
        } else {
            idConf +=1
        }
        changePosition(idConf)
}

function play() {
    for (var i=0; i<5; i++) {
        setTimeout(animate, 1000*i);
    }
    i=0                          
}

//Uccidi il ragno
function killIt(coordinate) {
    d3.select("#spider"+coordinate)
    .attr("locked",1)
    .attr("xlink:href","immagini/deadSpider.svg")
}

//Cambia la posizione del ragno al click                  
function move(){
    document.querySelector("#svg").addEventListener("click", play);
}



//Disegna la prima configurazione di ragni
function drawspider(idConf){
    var svg= d3.select("svg")
    for (let i = 0; i < 10; i++) {
        svg.append("svg:image")
        .attr("xlink:href", "immagini/spider.svg")
        .attr("id", "spider"+i)
        .attr("locked", 0)
		.attr("width", 100)
		.attr("height", 100)
		.attr("orientation", 0)
        .attr("transform", "translate("+setPosition(i, idConf).x+","+setPosition(i, idConf).y+") rotate(0)")
        .on("click", function(){killIt(i)})
    }
}

//Rimuovi il bottone Start
function removeButton() {
    var elem = document.getElementById('button');
    elem.parentNode.removeChild(elem);
    return false;
}

function start() {
    removeButton();
    drawspider(idConf)
    move()
}



function readFileJson(){
    return $.ajax({
    type: 'GET',
    url: 'configuration.json',
    async: false,
    dataType: 'json',
    data: { action : 'getList' },
    done: function(results) {
        JSON.parse(results);
        return results;
    },
    fail: function( jqXHR, textStatus, errorThrown ) {
        console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
    }
   }).responseJSON;
}


function setPosition(i, idConf) {
    var pos = config[idConf]
    switch (idConf) {
                
        case 0: //in fila
             return { x: eval(pos.x)*(i+1), y: eval(pos.y)}

        case 1:  //C
            if (i<3) {
                return { x: eval(pos.x)*i+470, y: eval(pos.y)}
            }
            else if (i==3) {
                return {x: eval(pos.xR), y: eval(pos.yTre)}
            } 
            else if (i==4) {
                return {x: eval(pos.xR), y: eval(pos.yQuattro)}
            } 
            else if (i===5) {
                return {x: eval(pos.xR), y: eval(pos.yCinque)}
            }

            else if (i===6) {
                return {x: eval(pos.xR), y: eval(pos.ySei)}
            }
            else{
                return { x: eval(pos.x)*(i*(-1)+12.50), y: eval(pos.yR)}
            }

        case 2: //I
             if (i<3) {
                return { x: eval(pos.x)*i+470, y: eval(pos.y)}
            }
            else if (i==3) {
                return {x: eval(pos.xR), y: eval(pos.yTre)}
            } 
            else if (i==4) {
                return {x: eval(pos.xR), y: eval(pos.yQuattro)}
            } 
            else if (i===5) {
                return {x: eval(pos.xR), y: eval(pos.yCinque)}
            }

            else if (i===6) {
                return {x: eval(pos.xR), y: eval(pos.ySei)}
            }
            else{
                return { x: eval(pos.x)*(i*(-1)+12.50), y: eval(pos.yR)}
            } 
          
        case 3: //A
            if(i===0)
                return { x: eval(pos.xUno), y: eval(pos.y)}
            else if(i>0&&i<3)
                return { x: eval(pos.x)*i*1.2+330, y: eval(pos.yUno)}
            else if(i>2&&i<5)
                return { x: eval(pos.x)*i*1.7-370, y: eval(pos.yDue)}
            else if(i>4&&i<8)
                return { x: eval(pos.x)*i*1-380, y: eval(pos.yTre)}
            else
                return{x: eval(pos.x)*(i*2.5-17.5), y: eval(pos.yQuattro)}
         
        case 4: //O
            if (i<3) {
                return { x: eval(pos.x)*i+470, y: eval(pos.yAlto)}
            }
            else if (i==3) {
                return {x: eval(pos.xR), y: eval(pos.ySu)}
            } 
            else if (i==4) {
                return {x: eval(pos.xR), y: eval(pos.yGiu)}
            } 
            else if (i===5) {
                return {x: eval(pos.xR2), y: eval(pos.ySu)}
            }

            else if (i===6) {
                return {x: eval(pos.xR2), y: eval(pos.yGiu)}
            }
            else{
                return { x: eval(pos.x)*(i*(-1)+12.50), y: eval(pos.yBasso)}
            } 
    }
}
