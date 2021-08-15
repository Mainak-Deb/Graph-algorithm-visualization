let w=1500+100,h=650+100;
let cell=10,i,j,neighbour;
let gw=parseInt(w/cell),gh=parseInt(h/cell);
let mainarr,a,live,justlive;
let run=false
let counter=0;
let bg=255,op=[0,0,0,255]

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function getgrid(x,y){
  print(x,y)
  return [parseInt(x/cell),parseInt(y/cell)]
}

function setup() {
  createCanvas(1500, 650);
  mainarr=make2DArray(gw,gh)
  for (let i = 0; i < gw; i++) {
    for (let j = 0; j < gh; j++) {
      mainarr[i][j] =0;
    }
  }
  // print(mainarr)
  button = createButton('Run🔺');
  button.position(20, 40);
  

}
function tooglerun() {
  if(run){
    run=false;
    bg=255;
    op=[0,0,0,255]
    
  }
  else{ 
    run=true;
    bg=0;
    op=[255,255,255,50]
  }
}

function validboundary(i,j){
  let valid=true
  if((i+1)>mainarr.length){valid=false}
  if((j+1)>mainarr[0].length){valid=false}
  if((i-1)<0){valid=false}
  if((j-1)<0){valid=false}
  // print(valid)
  return valid;

}

function checkneighbour(i,j){
  let lifecount=0;
  if(validboundary(i,j)){if(mainarr[(i+1)%gw][j%gh]==1){lifecount++}}
  if(validboundary(i,j)){if(mainarr[(i)%gw][(j+1)%gh]==1){lifecount++}}
  if(validboundary(i,j)){if(mainarr[(i+1)%gw][(j+1)%gh]==1){lifecount++}}
  if(validboundary(i,j)){if(mainarr[(i+1)%gw][(j-1)%gh]==1){lifecount++}}

  if(validboundary(i,j)){if(mainarr[(i-1)%gw][(j)%gh]==1){lifecount++}}
  if(validboundary(i,j)){if(mainarr[(i)%gw][(j-1)%gh]==1){lifecount++}}
  if(validboundary(i,j)){if(mainarr[(i-1)%gw][(j-1)%gh]==1){lifecount++}}
  if(validboundary(i,j)){if(mainarr[(i-1)%gw][(j+1)%gh]==1){lifecount++}}
  
  return lifecount;
}





function draw() {
  colorMode(RGB,255);
  background(bg);
  stroke(op[0],op[1],op[2],op[3])
  button.mousePressed(tooglerun);
  for(i=0;i<width+cell;i=i+cell){
    line(i,0,i,height);
  }
  for(j=0;j<height+cell;j=j+cell){
    line(0,j,width,j);
  }
  if(!run){
   
      if (mouseIsPressed) {
        grid=getgrid(mouseX,mouseY)
        console.log(grid)
        mainarr[grid[0]][grid[1]]=1
        //print(0,justlive,run)
      }
  }else{
   
    print("this")
    //print(mainarr)
    justlive=make2DArray(gw,gh)
    // print(1,justlive)
    for(i=0;i<mainarr.length;i++){
      for(j=0;j<mainarr[i].length;j++){
        neighbour= checkneighbour(i,j)
        //print(neighbour)

        if (mainarr[i][j] == 0 && neighbour == 3) {
          justlive[i][j] = 1;
        } else if (mainarr[i][j] == 1 && (neighbour < 2 || neighbour > 3)) {
          justlive[i][j] = 0;
        } else {
          justlive[i][j] = mainarr[i][j];
        }
      }
    }
  
    mainarr=justlive;
    //print(mainarr,justlive)

  }
  for(i=0;i<mainarr.length;i++){
      for(j=0;j<mainarr[i].length;j++){
        colorMode(HSB, gw/2);
        fill(Math.abs(i-gw/2), gw, gw);
        if(mainarr[i][j]==1){
          rect(cell*i,cell*j,cell,cell)
        }

      }
  }

}



