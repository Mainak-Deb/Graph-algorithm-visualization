let i,j;
let graph;
let col=10,row=5;
let names;
let queue=[],visited=[];
let start,end;
let state=false;
let pushcolor=[]
let speed=10;
let radius=60;
let textheight=35;
let ring=10;
let w=150*col,h=124*row;




function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
}



function makegraph(arr){
    graph=new Array(col*row);
    let a=[]
    for (let i = 0; i < arr.length; i++) {
        
        for (let j = 0; j <arr[i].length; j++) {
            if((i+1)<arr.length){a.push(arr[i+1][j])}
            if((j-1)>=0){a.push(arr[i][j-1])}
            if((i-1)>=0){a.push(arr[i-1][j])}
            if((j+1)<arr[i].length){a.push(arr[i][j+1])}
            

            graph[arr[i][j]]=a
            //print(arr[i][j],a)
            a=[]
        }
      }
  //print(graph)
}

function dfs(node,find){
    
    if(node==find){
        visited.push(node)
        return "Found"
    }else if(visited.includes(node)){
        return
    }else{
        visited.push(node)
        print(visited)
        let now=graph[node]
        let i=0;
        print("neighbors of ",node," are ",now)
        for(i=0;i<now.length;i++){
          print(node,i)
            if(!visited.includes(now[i])){
              //print(now[i])
                whr=dfs(now[i],find)
                if(whr=="found") return found;
            }
        }
        print("yes",i)
        return
    }
    return;
}






function setup() {
  createCanvas(w,h);
  names=make2DArray(col,row)
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
        names[i][j] =(j*col)+i;
    }
  }
  makegraph(names)
  //print(graph)
  //print(names)
  let inp = createInput('');
  inp.position(62, 56);
  inp.size(50);
  inp.input(inpstart);

  let inp2 = createInput('');
  inp2.position(200, 56);
  inp2.size(50);
  inp2.input(inpend);

  let inp3 = createInput('10');
  inp3.position(350, 56);
  inp3.size(50);
  inp3.input(inpspeed);

  startin = createButton('Start');
  startin.position(20, 56);

  endin = createButton('🔍Find');
  endin.position(140, 56);

  speedin = createButton('🏃🏼‍♀️speed%');
  speedin.position(270, 56);

  Reload = createButton('🔃Reload');
  Reload.position(560, 56);
  Reload.mousePressed(pageload);

  run = createButton('Run 🟥');
  run.position(460, 56);
  run.mousePressed(runthis);
}

function inpstart() {
  start= this.value();
}

function inpend() {
  end= this.value();
}


function inpspeed() {
  speed= this.value();
  //print(speed)
}


function pageload() {
  location.reload();
}


function runthis() {
  //print(start,end)
  dfs(parseInt(start),parseInt(end))
  let cut=visited.length
  for(i=0;i<visited.length;i++){
    if(visited[i]==parseInt(end)){
      cut=i;
      break;
    }
  }
  visited=visited.slice(0, cut+1);
  //print(visited)
  //pushcolor=[]
  state=true;
}

let counter=0
let d3=0,diff=40;



function givepos(i,j,k){
  let r=20
  let x=200+(2*radius*i)+noise(i*r,j*r+k,k)*diff;
  let y=60+(2*radius*j)+noise(i*r+k,j*r,k)*diff
  return [x,y]
}



function draw() {
  background(0);
  if(!state){
    counter=0;
  }
  if(state){
    
    for(i=pushcolor.length-1;i<=counter;i++){
      if(i<visited.length){
        if(!pushcolor.includes(visited[parseInt(i)])){
          pushcolor.push(visited[parseInt(i)])
        }
      }
    }
    //print(parseInt(speed)/100)
    counter=counter+(parseInt(speed)/100);
    //print(pushcolor)
    
  }
  ////print(state)
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      strokeWeight(4); 
      if((i+1)<col){
        if((pushcolor.includes(parseInt(names[i+1][j]))) && (pushcolor.includes(parseInt(names[i][j]))) ){
          stroke(252, 3, 11);
        }else{
          stroke(255,255,0);
        }
        nowpos=givepos(i,j,d3)
        thenpos=givepos(i+1,j,d3)
        line(nowpos[0],nowpos[1],thenpos[0],thenpos[1])
      }
      if((j+1)<row){
        if((pushcolor.includes(parseInt(names[i][j+1])))  && (pushcolor.includes(parseInt(names[i][j]))) ){
          stroke(252, 3, 11);
        }else{
          stroke(255,255,0);
        }
        nowpos=givepos(i,j,d3)
        thenpos=givepos(i,j+1,d3)
        line(nowpos[0],nowpos[1],thenpos[0],thenpos[1])
      }
    }
  }
  //print(pushcolor)
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      strokeWeight(ring);
      
      if((names[i][j]==parseInt(start) )&& (pushcolor.includes(parseInt(names[i][j])))){
        fill(0, 132, 255);
        stroke(255, 0, 234);
      }else if((names[i][j]==parseInt(end) )&& (pushcolor.includes(parseInt(names[i][j])))){
        fill(255, 0, 234);
        stroke(0, 132, 255);
        queue=[]
        visited=[]
      }else if(pushcolor.includes(parseInt(names[i][j]))){
        fill(34, 168, 0);
        stroke(212, 131, 0);
      }else{
        fill(0, 2, 250);
        stroke(0,255,255);
      }

      nowpos=givepos(i,j,d3)
      circle(nowpos[0],nowpos[1], radius);
      strokeWeight(0)
      textSize(textheight);
      fill(255);
      text(String(names[i][j]),nowpos[0]-radius/3,radius/6+nowpos[1]);
      
    }
  }
  d3=(d3+0.01)%100000;
}

