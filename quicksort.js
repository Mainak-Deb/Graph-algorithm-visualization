let w=1500,h=620;
let bg=255;
let midy=h/2;
let arrsz=100;
let array;
let current=false;
let cell=20;
let linecol=[74, 71, 255,180]
let finalstates=[]
let speed=20;


function randomise_array(array) {
    array.sort(() => Math.random() - 0.5);
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

function makearr(size){
    print(size)
    array=new Array(size)
    points=[]
    for(let i=0;i<size;i++){
        array[i]=parseInt(i+1)
    }
    randomise_array(array)
    print(array)

}


function compareDecimals(a, b) {
    if (a === b) 
         return 0;

    return a < b ? -1 : 1;
}

function toogle(){
    //array.sort(compareDecimals)
    quickSortRecursive(array, 0, array.length - 1)
    if(current){
        makearr(arrsz)
        current=false;
        bg=255;
        linecol=[74, 71, 255,50]
    }else{ 

        current=true;
        
        bg=20;
        linecol=[255,255,255,50] 
    }
}


function changesize(){
    arrsz= parseInt(this.value());
    makearr(arrsz)
}


function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
        // Swapping elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        // Moving to next element
        pivotIndex++;
        finalstates.push(arr.slice())
        }
    }
    
    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    return pivotIndex;
};


function quickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    //finalstates.push(arr.slice())
    print(arr)
    // Recursively apply the same logic to the left and right subarrays
    quickSortRecursive(arr, start, index - 1);
    //finalstates.push(arr.slice())
    print(arr)
    quickSortRecursive(arr, index + 1, end);
    print(arr)
    //finalstates.push(arr.slice())
}


function inpspeed() {
    speed= this.value();
    //print(speed)
  }
  
function pageload() {
    location.reload();
  }


function setup() {
    createCanvas(w,h);
    makearr(arrsz);

    let inp = createInput('100');
    inp.position(16, 56);
    inp.size(50);
    inp.input(changesize);

    let inp3 = createInput('20');
    inp3.position(280, 56);
    inp3.size(50);
    inp3.input(inpspeed);


    chngsz = createButton('change size');
    chngsz.position(74, 56);
    //chngsz.mousePressed();

    run = createButton('Run ???');
    run.position(400, 56);
    run.mousePressed(toogle);

    speedin = createButton('?????????????????speed%');
    speedin.position(200, 56);

    Reload = createButton('????Reload');
    Reload.position(500, 56);
    Reload.mousePressed(pageload);
}
let l=0
function draw() {
    colorMode(RGB,255);
    background(bg);
    line(0,midy,w,midy)
    rc=width/arrsz
    rh=height-20;
    cell=Math.max(rc,10)
    //print(bg)
    strokeWeight(1); 
    stroke(linecol[0],linecol[1],linecol[2],linecol[3])
    
    for( let i=0;i<width+cell;i=i+cell){
        line(i,0,i,height);
    }
    for(let j=0;j<height+cell;j=j+cell){
        line(0,j,width,j);
    }
    colorMode(HSB,arrsz);
    strokeWeight(1); 
    //print(state)
    if(!current){
        for(let i=0;i<arrsz;i++){
            fill(array[i],arrsz,arrsz)
            rect(i*rc,midy-(rh*(array[i]/arrsz))/2,rc,(rh*(array[i]/arrsz)))
        }
        l=0;
    }else{
        //print(l)
        //print(finalstates)
        nowstate=finalstates[parseInt(l)]
        //print(nowstate)
        if((finalstates.length>0) && (l<finalstates.length)){
            nowstate=finalstates[parseInt(l)]
            for(let i=0;i<arrsz;i++){
                fill(nowstate[i],arrsz,arrsz)
                rect(i*rc,midy-(rh*(nowstate[i]/arrsz))/2,rc,(rh*(nowstate[i]/arrsz)))
            }
            
            l=l+speed/100
        }else{
            nowstate=array.sort(compareDecimals)
            for(let i=0;i<arrsz;i++){
                fill(nowstate[i],arrsz,arrsz)
                rect(i*rc,midy-(rh*(nowstate[i]/arrsz))/2,rc,(rh*(nowstate[i]/arrsz)))
            }
        }
    }
    
    
}