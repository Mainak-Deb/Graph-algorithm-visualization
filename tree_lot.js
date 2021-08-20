let i,j;
let graph;
let level=4;
let nodesnum=Math.pow(2,level)-1;
let names;
let queue=[],visited=[];
let start=0,end;
let state=false;
let pushcolor=[]
let speed=5;
let radius=60;
let textheight=35;
let ring=10;
let w=188*Math.pow(2,level-1),h=124*(level+1);
let tree;
let treepos=[]



function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
}



function maketree(){
    tree=new Array(nodesnum);
    treepos=new Array(nodesnum);
    for(i=Math.pow(2,level-1)-1;i<nodesnum;i++){
        treepos[i]=60+160*(i-(Math.pow(2,level-1)-2))
    }
    print(treepos)
    for(i=0;i<nodesnum;i++){
      tree[i]=i
      
    }
    treepos[0]=tree_cordinate(0)
    print(treepos)
}


function tree_cordinate(m){
  if(m<nodesnum){
    if(m>=Math.pow(2,level-1)-1){
      return treepos[m]
    }else{
    let co= (tree_cordinate((m*2)+1)+tree_cordinate((m*2)+2))/2
    print("co-ordinate of ",m," is ",co)
    treepos[m]=co
    return co
    }
  }
  return;
}


function bfs(s,e){
    queue.push(s)
    visited.push(s)

    while(queue.length>0){
        print("queue",queue)
        if(queue[0]==e){
          print("done,destination found")
          return;
        }else{
          b=nextlevel(queue[0])
          queue=queue.concat(b)
          visited=visited.concat(b)
        }
        print(queue[0],"dequeued")
        queue.shift()
        print(visited)
    }    
    //print(queue)
    print(visited)
    
}


function nextlevel(l){
  if((l*2)+1>nodesnum){
    return []
  }else{
    a=[]
    if(!visited.includes((l*2)+1)){
      a.push((l*2)+1)
    }
    if(!visited.includes((l*2)+2)){
      a.push((l*2)+2)
    }
    return a
  }
  
}






function setup() {
  createCanvas(w,h);
  
  maketree()
  //print(graph)
  //print(names)
  
  let inp2 = createInput('');
  inp2.position(200, 56);
  inp2.size(50);
  inp2.input(inpend);

  let inp3 = createInput('5');
  inp3.position(350, 56);
  inp3.size(50);
  inp3.input(inpspeed);

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
  bfs(parseInt(start),parseInt(end))
  let cut=visited.length
  for(i=0;i<visited.length;i++){
    if(visited[i]==parseInt(end)){
      cut=i;
      break;
    }
  }
  visited=visited.slice(0, cut+1);
  //print(visited)
  pushcolor=[]
  state=true;
}

let counter=0
let d3=0,diff=40;



function givepos(i,z){
  let r=20
  let x=treepos[i]+noise(treepos[i],z)*40;
  let y=60+(2.5*radius*(parseInt(Math.log2(i+1))))+noise(i*10,z)*40;
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
  for(i=0;i<nodesnum;i++){
    nowpos=givepos(i,d3)
    leftpos=givepos((i*2)+1,d3)
    rightpos=givepos((i*2)+2,d3)
    //stroke(255)
    strokeWeight(6)
    if(pushcolor.includes((i*2)+2)){
      stroke(255, 154, 3);
    }else{
      stroke(255);
    }
    line(nowpos[0],nowpos[1],rightpos[0],rightpos[1])
    if(pushcolor.includes((i*2)+1)){
      stroke(255, 154, 3);
    }else{
      stroke(255);
    }
    line(nowpos[0],nowpos[1],leftpos[0],leftpos[1])

  }
  for(i=0;i<nodesnum;i++){
    if((i==parseInt(start) )&& (pushcolor.includes(i))){
      fill(0, 132, 255);
      stroke(255, 0, 234);
    }else if((i==parseInt(end))&& (pushcolor.includes(i))){
      fill(255, 0, 234);
      stroke(0, 132, 255);
      queue=[]
      visited=[]
    }else if(pushcolor.includes(i)){
      fill(3, 252, 65);
      stroke(227, 252, 3);
    }else{
      fill(0, 2, 250);
      stroke(0,255,255);
    }
      strokeWeight(10)
      stroke(0,255,255);
      nowpos=givepos(i,d3)
      circle(nowpos[0],nowpos[1], radius);
      strokeWeight(0)
      textSize(textheight);
      fill(255);
      text(String(i),nowpos[0]-radius/3,radius/6+nowpos[1]);
      
  }
  d3=(d3+0.01)%100000;
  
}

