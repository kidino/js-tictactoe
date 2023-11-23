let current_turn = 'player-1'; // status giliran

// 8 cara untuk menang
let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

document.getElementById(current_turn).classList.add('turn')

const boxes_container = document.getElementById('boxes');

// bila pemain hover kotak -- bawa tanda x atau o
boxes_container.addEventListener('mouseover', (event) => {
    const hoverElement = event.target;

    if(!hoverElement.classList.contains('checked')) {
        hoverElement.classList.add(current_turn);
        hoverElement.classList.add('temp');
    }
});

// bila pemain keluar dari hover kotak -- buang balik x atau o
boxes_container.addEventListener('mouseout', (event) => {
    const hoverElement = event.target;

    if(hoverElement.classList.contains('temp') 
    && !hoverElement.classList.contains('checked')
    ) {
        hoverElement.classList.remove('temp');
        hoverElement.classList.remove( current_turn );
    }
});

// bila pemain klik kotak
boxes_container.addEventListener('click', (event) => {
    const clickedElement = event.target;

    // Check if the clicked element is a grid item
    if (clickedElement.classList.contains('box')) {
        // mendapatkan index kotak yang diklik
        const index = Array.from(clickedElement.parentNode.children).indexOf(clickedElement);

        // kalau dah checked -- tak boleh klik
        if(!clickedElement.classList.contains('checked')) {
            // tandakan box
            clickedElement.classList.add(current_turn);
            clickedElement.classList.add('checked');

            // dah menang ke?
            if(check_winner()) {
                // kena delaykan sikit nak bagi css kotak kuning keluar
                setTimeout(function(){
                    alert(current_turn + ' is the winner');
                    reset_game();    
                },10);
            } else {
                // tak menang -- tapi stalemate ke?
                if(!check_stalemate()) {
                    // tak stalemate -- giliran seterusnya
                    update_turn();
                }
            }
        }
    }
});

// tukar giliran -- trigger lepas pemain klik
function update_turn() {
    if(current_turn == 'player-1') {
        current_turn = 'player-2';
    } else {
        current_turn = 'player-1';
    }
    document.querySelectorAll('.player').forEach(function(el){
        el.classList.remove('turn');
    });

    document.getElementById(current_turn).classList.add('turn');
}

// adakah dah menang -- trigger lepas pemain klik
function check_winner() {
    let winner = false;
    let bx = document.querySelectorAll('.box');

    win.forEach(function(w) {
        if((bx[w[0]].classList.contains(current_turn))
            && (bx[w[1]].classList.contains(current_turn))
            && (bx[w[2]].classList.contains(current_turn))) {

            // tandakan kotak yang menang warna kuning
            bx[w[0]].classList.add('winner');
            bx[w[1]].classList.add('winner');
            bx[w[2]].classList.add('winner');
    
            winner = true;
        }
    })
    return winner;
}

// kalau ada yang menang, atau stalemate -- reset balik
function reset_game() {
    document.querySelectorAll('.player').forEach(function(el){
        el.classList.remove('turn');
    })

    document.getElementById('player-1').classList.add('turn');
    document.querySelectorAll('.box').forEach(function(el){
        el.classList.remove('player-1');
        el.classList.remove('player-2');
        el.classList.remove('checked');
        el.classList.remove('winner');
        el.classList.remove('temp');
    })

    current_turn = 'player-1';
}

// check adakah stalemate -- trigger lepas pemain klik
function check_stalemate() {
    // check if all boxes are checked
    if(document.querySelectorAll('.checked').length == 9) {
        alert('Stalemate - nobody wins');
        reset_game();
        return true;
    }

    return false;
}
