let w=1500,h=620;
let bg=255;
let midy=h/2;
let arrsz=100;
let array;
let current=false;
let cell=20;
let linecol=[74, 71, 255,180]
let finalstates=[]

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
    mergeSort(array, 0, array.length - 1)
    if(current){
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

function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
 
    // Merge the temp arrays back into arr[l..r]
 
    // Initial index of first subarray
    var i = 0;
 
    // Initial index of second subarray
    var j = 0;
 
    // Initial index of merged subarray
    var k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    //print(array)
}
 
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
    //print(arr)
    finalstates.push(arr.slice())
    //print(finalstates)
}

function setup() {
    createCanvas(w,h);
    makearr(arrsz);

    let inp = createInput('100');
    inp.position(16, 56);
    inp.size(50);
    inp.input(changesize);

    chngsz = createButton('change size');
    chngsz.position(74, 56);
    //chngsz.mousePressed();

    run = createButton('Run ▶');
    run.position(200, 56);
    run.mousePressed(toogle);

}
let l=0
function draw() {
    colorMode(RGB,255);
    background(bg);
    line(0,midy,w,midy)
    rc=width/arrsz
    rh=height-20;
    cell=Math.max(rc,10)
    print(bg)
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
        print(l)
        //print(finalstates)
        nowstate=finalstates[parseInt(l)]
        print(nowstate)
        if((finalstates.length>0) && (l<finalstates.length)){
            nowstate=finalstates[parseInt(l)]
            for(let i=0;i<arrsz;i++){
                fill(nowstate[i],arrsz,arrsz)
                rect(i*rc,midy-(rh*(nowstate[i]/arrsz))/2,rc,(rh*(nowstate[i]/arrsz)))
            }
            
            l=l+0.2
        }else{
            nowstate=array.sort(compareDecimals)
            for(let i=0;i<arrsz;i++){
                fill(nowstate[i],arrsz,arrsz)
                rect(i*rc,midy-(rh*(nowstate[i]/arrsz))/2,rc,(rh*(nowstate[i]/arrsz)))
            }
        }
    }
    
    
}