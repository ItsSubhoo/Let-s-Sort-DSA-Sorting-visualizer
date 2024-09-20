const n = 20;
const arr = [];
for (let i = 0; i < n; i++) {

    arr[i] = Math.random();
    

}
console.log(arr);

let audioCtx=null;

// function playNode(freq){
//     if(audioCtx==null){

//         audioCtx = new(
            
//             AudioContext ||
//             webkitAudioContext ||
//             window.webkitAudioContext
//         )();
//     }

//     const dur =0.1;
//     const osc = audioCtx.createOscillator();
//     osc.frequency.value=freq;
//     osc.start();
//     osc.stop(audioCtx.currentTime+dur);
//     const node=audioCtx.createGain();
//     node.gain.value=0.01;
//     node.gain.linearRampToValueAtTime(
//         0,audioCtx.currentTime+dur
//     );
//     osc.connect(node);
//     osc.connect(audioCtx.destination);

// }


function playNode(freq) {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }

    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.3;  // Set initial gain (volume)
    
    // Ramp the gain down to 0 at the end of the sound
    gainNode.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime + dur
    );

    osc.connect(gainNode);       // Connect the oscillator to the gain node
    gainNode.connect(audioCtx.destination);  // Connect the gain node to the audio context's destination
}




function bubbleSort() {
    var moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < n; i++) {

            moves.push({

                elem: [i-1, i ],
                action: 'comp',

            });
            if (arr[i - 1] > arr[i]) {
                swapped = true;
                moves.push({

                    elem: [i-1, i ],
                    action: 'swap',

                });
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]

            }
        }
    } while (swapped)

    return moves;

}

function quickSort(arr, left = 0, right = arr.length - 1) {
    let moves = [];
    if (left < right) {
        let pivotIndex = partition(arr, left, right, moves);
        quickSortRecursive(arr, left, pivotIndex - 1, moves);
        quickSortRecursive(arr, pivotIndex + 1, right, moves);
    }
    return moves;
}

function quickSortRecursive(arr, left, right, moves) {
    if (left < right) {
        let pivotIndex = partition(arr, left, right, moves);
        quickSortRecursive(arr, left, pivotIndex - 1, moves);
        quickSortRecursive(arr, pivotIndex + 1, right, moves);
    }
}

function partition(arr, left, right, moves) {
    let pivot = arr[right]; // Choosing the rightmost element as the pivot
    let i = left - 1;

    for (let j = left; j < right; j++) {
        moves.push({
            elem: [j, right],  // Comparison with pivot
            action: 'comp',
        });
        if (arr[j] < pivot) {
            i++;
            moves.push({
                elem: [i, j],  // Swapping elements
                action: 'swap',
            });
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    moves.push({
        elem: [i + 1, right],  // Swapping pivot to correct position
        action: 'swap',
    });
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}
qsBtn.addEventListener("click",playQs);



bbsBtn.addEventListener("click", play);
// bbsBtn.addEventListener("click",bubbleSort);  THIS IS IMPORTANT
resetBtn.addEventListener('click', () => {
    container.innerHTML = " ";

    for (let i = 0; i < n; i++) {


        arr[i] = Math.random();
        const bar = document.createElement("div");
        bar.style.height = Math.floor(arr[i] * 100) + "%";
        bar.innerText = bar.style.height.slice(0, -1);
        bar.style.color = "white";
        // bar.style.justifyContent="center"
        bar.style.paddingLeft = "3px";
        bar.style.marginLeft = "5px"
        bar.style.width = "30px";
        bar.style.backgroundColor = "blue";
        bar.style.border = "1px solid rgb(23 155 155 / 50%);";
        container.appendChild(bar);
    }
})


for (let i = 0; i < n; i++) {

    const bar = document.createElement("div");
    bar.style.height = Math.floor(arr[i] * 100) + "%";
    bar.innerText = bar.style.height.slice(0, -1);
    bar.style.color = "white";
    // bar.style.justifyContent="center"
    bar.style.paddingLeft = "3px";
    bar.style.marginLeft = "5px"
    bar.style.width = "30px";
    bar.style.backgroundColor = "blue";
    bar.style.border = "1px solid rgb(23 155 155 / 50%);";
    container.appendChild(bar);
}

function play() {
    let copy = [...arr];
    const moves = bubbleSort();
    console.log(arr);
    console.log(copy);
    animate(moves, copy);

}

function animate(moves, copy) {
    if (moves.length == 0) return;

    let move = moves.shift();
    const [i, j] = move.elem;

    if (move.action == "swap")
        [copy[i], copy[j]] = [copy[j], copy[i]];


    playNode(100+copy[i]*500)
    playNode(100+copy[j]*500)
    ShowBars(copy, i, j);
    setTimeout(() => {
        animate(moves, copy)

    }, 100);
}

function ShowBars(djarr, k, l, action) {

    container.innerHTML = "";
    for (let i = 0; i < n; i++) {


        const bar = document.createElement("div");
        bar.style.height = Math.floor(djarr[i] * 100) + "%";
        bar.innerText = bar.style.height.slice(0, -1);
        bar.style.color = "white";
        // bar.style.justifyContent="center"
        bar.style.paddingLeft = "3px";
        bar.style.marginLeft = "5px"
        bar.style.width = "30px";
        if (i == k) {
            bar.style.backgroundColor = action == "swap" ? "red" : "brown"
            bar.style.border = "1px solid " + action == "swap" ? "red" : "brown";
        }
        else if (l == i) bar.style.backgroundColor = "green";
        else {
            bar.style.backgroundColor = "blue";
            bar.style.border = "1px solid rgb(23 155 155 / 50%);";
        }
        container.appendChild(bar);
    }

}



function playQs() {
    let copy = [...arr];
    const moves = quickSort(arr);
    console.log(arr);
    console.log(copy);
    animate(moves, copy);

}



