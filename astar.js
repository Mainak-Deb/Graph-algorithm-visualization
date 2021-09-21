let w=1500,h=625;
let cell=25,i,j,neighbour;
let gw=parseInt(w/cell),gh=parseInt(h/cell);
let mainarr,a,live,justlive;
let run=false
let counter=0;
let bg=255,op=[0,0,0,255]
let start=[0,0]
let end=[gw-1,gh-1]
let startdrag=false,enddrag=false;
let queue=[]
let pathqueue=[" "]
let optimalpath;
let colrarr;
let nwx,nwy;
let reversecheck;

function priorityinsert(queue,val){
    let i=0;
    print(val)
    console.log("queue",queue.slice())
    while((i<queue.length) && (queue[i][1]<val[1])){i++;}
    queue.splice(i, 0, val);
    return queue;
}
function m_dist(x1,y1,x2,y2){
  return Math.abs(x1-x2)+Math.abs(y1-y2)
}


function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function getgrid(x,y){
  return [parseInt((x%w)/cell),parseInt((y%h)/cell)]
}

function setup() {
  createCanvas(w,h);
  mainarr=make2DArray(gw,gh)
  colrarr=make2DArray(gw,gh)

  for (let i = 0; i < gw; i++) {
    for (let j = 0; j < gh; j++) {
      mainarr[i][j] =0;
      colrarr[i][j] =100000;
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
    queue.push([start,0])
    console.log(m_dist(start[0],start[1],end[0],end[1]))
    colrarr[start[0]][start[1]]=0;
    print(queue.slice())
    run=true;
    bg=50;
    op=[255,255,255,50]
  }
}

function validboundary(i,j){
  let valid=true
  //print(i,j)
  if(i>mainarr.length-1){valid=false}
  if(j>mainarr[0].length-1){valid=false}
  if(i<0){valid=false}
  if(j<0){valid=false}
  // print(valid)
  return valid;

}

function checkneighbour(i,j){
  let array=[];
  if(validboundary(i+1,j)){if((mainarr[(i+1)][j]!=1) && (mainarr[(i+1)][j]!=2)  && (mainarr[(i+1)][j]!=3) ){array.push([i+1,j]);colrarr[i+1][j]=Math.min(colrarr[i+1][j],colrarr[i][j]+1);mainarr[i+1][j]=3;}}                                 
  if(validboundary(i,j+1)){if((mainarr[(i)][j+1]!=1) && (mainarr[(i)][j+1]!=2)  && (mainarr[(i)][j+1]!=3)){array.push([i,j+1]);colrarr[i][j+1]=Math.min(colrarr[i][j+1],colrarr[i][j]+1);mainarr[i][j+1]=3;}}
  //if(validboundary(i+1,j+1)){if((mainarr[(i+1)][(j+1)]!=1) && (mainarr[(i+1)][(j+1)]!=2) ){array.push([i+1,j+1])}}
  //if(validboundary(i+1,j-1)){if((mainarr[(i+1)][(j-1)]!=1) && (mainarr[(i+1)][(j-1)]!=2) ){array.push([i+1,j-1])}}

  if(validboundary(i-1,j)){if((mainarr[(i-1)][(j)]!=1) && (mainarr[(i-1)][(j)]!=2) && (mainarr[(i-1)][(j)]!=3)){array.push([i-1,j]);colrarr[i-1][j]=Math.min(colrarr[i-1][j],colrarr[i][j]+1);mainarr[i-1][j]=3;}}
  if(validboundary(i,j-1)){if((mainarr[(i)][(j-1)]!=1) && (mainarr[(i)][(j-1)]!=2) && (mainarr[(i)][(j-1)]!=3)){array.push([i,j-1]);colrarr[i][j-1]=Math.min(colrarr[i][j-1],colrarr[i][j]+1);mainarr[i][j-1]=3;}}
  //if(validboundary(i-1,j-1)){if((mainarr[(i-1)][(j-1)]!=1) && (mainarr[(i-1)][(j-1)]!=2) ){array.push([i-1,j-1])}}
  //if(validboundary(i-1,j+1)){if((mainarr[(i-1)][(j+1)]!=1) && (mainarr[(i-1)][(j+1)]!=2) ){array.push([i-1,j+1])}}

  //print(colrarr)
  return array;
}


function checkmin(i,j){
  if((i==start[0]) && (j==start[1]) ) { return [i,j]}
  let array=[];
  if(validboundary(i+1,j)){if(mainarr[(i+1)][j]!=1) {array.push([i+1,j]);}}                               
  if(validboundary(i,j+1)){if(mainarr[(i)][j+1]!=1){array.push([i,j+1]);}}
  //if(validboundary(i+1,j+1)){if((mainarr[(i+1)][(j+1)]!=1) && (mainarr[(i+1)][(j+1)]!=2) ){array.push([i+1,j+1])}}
  //if(validboundary(i+1,j-1)){if((mainarr[(i+1)][(j-1)]!=1) && (mainarr[(i+1)][(j-1)]!=2) ){array.push([i+1,j-1])}}

  if(validboundary(i-1,j)){if(mainarr[(i-1)][(j)]!=1){array.push([i-1,j]);}}
  if(validboundary(i,j-1)){if(mainarr[(i)][(j-1)]!=1){array.push([i,j-1]);}}
  //if(validboundary(i-1,j-1)){if((mainarr[(i-1)][(j-1)]!=1) && (mainarr[(i-1)][(j-1)]!=2) ){array.push([i-1,j-1])}}
  //if(validboundary(i-1,j+1)){if((mainarr[(i-1)][(j+1)]!=1) && (mainarr[(i-1)][(j+1)]!=2) ){array.push([i-1,j+1])}}

  //print(colrarr)
  let minimum=end;
  print(array)
  for(let i=0;i<array.length;i++){
      if(colrarr[minimum[0]][minimum[1]]>colrarr[array[i][0]][array[i][1]]){
          minimum=array[i]
          //print()

      }
  }
  print(minimum)
  print(colrarr[minimum[0]][minimum[1]])
  return minimum;

}



let isfound=false
let incr=0


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
        if((startdrag) || (enddrag)){
            mainarr[grid[0]][grid[1]]=0
        }else{
            mainarr[grid[0]][grid[1]]=1
        }
      }
  }else{
    if((queue.length>0) && (!isfound)){
        //print("queue2",queue)
        if(eqpos(queue[0][0],end)){
          print("done,destination found")
          print(colrarr)
          isfound=true
          reversecheck=end;
        }else{
          b=checkneighbour(queue[0][0][0],queue[0][0][1])
          print(b)
          queue.shift()
          for(let i=0;i<b.length;i++){
            let hval=m_dist(end[0],end[1],b[i][0],b[i][1])
            let fval=hval+colrarr[b[i][0]][b[i][1]]
            print(hval)
            print("queue3",queue.slice())
            queue=priorityinsert(queue,[b[i],fval])
          }
          
          mainarr[queue[0][0][0]][queue[0][0][1]]=2
          print(queue[0],"dequeued")
        
        }
        
       
    }else{
      nb=checkmin(reversecheck[0],reversecheck[1])
      console.log(end,nb)
      mainarr[nb[0]][nb[1]]=5;
      reversecheck=nb;
    }    

  }
  
  for(i=0;i<mainarr.length;i++){
      for(j=0;j<mainarr[i].length;j++){
        
        if(mainarr[i][j]==1){
            fill(0)
        }else if(mainarr[i][j]==0){
            fill(255,255,255)
        }else if((mainarr[i][j]==2) ||(mainarr[i][j]==3)){
            colorMode(HSB, gw+gh);
            //fill((abs(start[0]-i)+abs(start[1]-j)), gw+gh*0.8, gw+gh*0.8)
            fill(colrarr[i][j]%(gw+gh), gw+gh*0.8, gw+gh*0.8)
            
        }else if(mainarr[i][j]==5){
          fill(255, 255,255)
        }
        if((mainarr[i][j]!=0) && (mainarr[i][j]!=3)){
            rect(cell*i,cell*j,cell,cell)
        }
        if(mainarr[i][j]==3){
          //fill(255,255,255)
          circle(i*cell+cell/2,j*cell+cell/2,cell/2)
        }
        colorMode(RGB, 225);
      }
  }




  //colouring part
  fill(0)
  circle(start[0]*cell+cell/2,start[1]*cell+cell/2,cell-2)
  fill(255)
  rect(cell*start[0]+cell/4,cell*start[1]+cell/4,cell/2,cell/2)
  
  
  fill(0)
  circle(end[0]*cell+cell/2,end[1]*cell+cell/2,cell-2)
  fill(255)
  circle(end[0]*cell+cell/2,end[1]*cell+cell/2,cell/2)
  
  if(startdrag==true){
    fill('rgba(0,0,0, 0.50)')
    circle(mouseX,mouseY,cell-2)
    fill('rgba(255,255,255, 0.75)')
    rect(mouseX-cell/4,mouseY-cell/4,cell/2,cell/2)
  }
  if(enddrag==true){
    fill('rgba(0,0,0, 0.50)')
    circle(mouseX,mouseY,cell-2)
    fill('rgba(255,255,255, 0.75)')
    circle(mouseX,mouseY,cell/2)
  }

}


function mousePressed() {
  if(!run){
    grid=getgrid(mouseX,mouseY)
    print("pressed",grid)
    if(eqpos(grid,start)){
       if(startdrag==false){
           startdrag=true
       }else{
        startdrag=false
       }
       print("strat",startdrag)
    }
    if(eqpos(grid,end)){
        if(enddrag==false){
            enddrag=true
        }else{
         enddrag=false
        }
        print("end",enddrag)
     }
}


}
function mouseReleased() {
  if(!run){
    grid=getgrid(mouseX,mouseY)
    print("released",grid)

    if(startdrag==true){
        start=grid
        startdrag=false
        print("strat",startdrag)
    }
   
     
    
    if(enddrag==true){
        end=grid
        enddrag=false
        print("end",enddrag)
    }
    
  }
}



function eqpos(a,b){
    if((a[0]==b[0]) && (a[1]==b[1])){
        return true
    }
    else{
        return false;
    }

}