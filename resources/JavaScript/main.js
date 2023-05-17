/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  QUOTE / BACKGROUND JS  ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function quotesBackdropGen() {
    let quotes = [
        "\"They're goin' ta bury what's left of ye in a soup can!\"",
        "\"KaaaaaBooooooom!!!\"",
        "\"oof tuff break, now pick yourself up and get back out there!\"",
        "\"Closed Casket it is then\"",
        "\"aaaahahahahaha you dummy it was the green wire!\"",
        "\"What!?... What!?!? was that, you're suposed to be a professional\"",
        "\"Oh, they're goin' ta have to glue you back together... IN HELL!\"",
        "\"And that's what yeh get for touching that!\"",
        "\"Let that be a bloody lesson to yeh!\"",
        "\"HeLlO!... hElLO... CAN ANYONE HEAR ME IM TRAPPED IN A FUNCTION GENERATING QUOTES!!!... oh no they're coming\"",
    ];

    let backdrops = [
        "'../bomb-defusal/resources/images/c4-texture.png'", 
        "'../bomb-defusal/resources/images/tnt-texture.png'",
        "'../bomb-defusal/resources/images/nuke-texture.png'"
    ];

    let ranQuote = Math.floor(Math.random() * 10);
    let ranBackdrop = Math.floor(Math.random() * 3);

    $('.quote').html(quotes[ranQuote]);
    $('.bd-con').css({
        'background-image' : 'url(' + backdrops[ranBackdrop] + ')'
    });
}

quotesBackdropGen();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  TIMER / START JS  /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var initial = 300001;
var count = initial;
var counter;
var initialMillis;
var completed = 0;

function timer() {
    if (count <= 0) {
        clearInterval(counter);
        return;
    }
    var current = Date.now();
    
    count = count - (current - initialMillis);
    initialMillis = current;
    displayCount(count);
}

function displayCount(count) {
    if (initial == 300001) {
        $('.timer p').html("5.00.000");
    }
    else {
        var res = Math.floor(count / 1000);
        var milliseconds = count.toString().substr(-3);
        var seconds = res % 60;
        var minutes = (res - seconds) / 60;
    
        $('.timer p').html(minutes + '.' + seconds + '.' + milliseconds);
    }
    if (minutes <= 2 && seconds <= 29){
        $('.timer').css({
            'color' : 'red'
        })
    }
    if (minutes <= 0 && seconds <= 0 && milliseconds <= 0 && completed != 1){
        $('.timer p').html("Danger");
        $('.timer p').css({
            'text-align' : 'center'
        });
        setInterval(blink_text, 100);
        gameOver();
    }
    if (minutes <= 0 && seconds <= 0 && milliseconds <= 0 && completed == 1){
        $('.timer p').html("DEFUSED");
        $('.timer p').css({
            'text-align' : 'center',
            'color' : 'limegreen'
        });
    }
}

$('.start').click(function() {
    $('.gameStart').addClass('hidden');
    $('.page-1, .page-2').css({
        'transition' : 'none'
    });
    clearInterval(counter);
    initialMillis = Date.now();
    counter = setInterval(timer, 1);
    initial = 300000;
});

displayCount(initial);

$('#retry-lose').click(function() {
    location.reload();
});

$('#retry-win').click(function() {
    location.reload();
});



function gameOver() {
    $('.handBook-con').addClass('hidden');
    $('.pro-bar').css({
        'transition' : 'none'
    });
    $('.hacking-con').addClass('hidden');
    setTimeout(function() { //overall timer
        $('.timer p').html(" ");
        $('.screenCrack').removeClass('hidden');
        $('.gameOver').css({
            'background-image' : "url('../bomb-defusal/resources/images/boom.gif')",
            'background-size' : 'cover',
            'background-position' : 'center',
            'z-index' : '2'
        });

        $('.gameOver').removeClass('hidden');
        setTimeout(function() { //remove bomb timer
            $('.bd-con').addClass('hidden');
            $('.tool-bar').addClass('hidden');
        }, 700);

        setTimeout(function() { //explo timer
            $('.gameOver').css({
                'background-image' : 'none',
            });
        }, 1000);

        setTimeout(function() { //explo timer
            $('.endScreen').removeClass('hidden');
            $('#failure').removeClass('hidden');
            for (let i = 1; i <= 3; i++) {
                if ($('#mg' + i).hasClass('finished')) {
                    $('#mini-game-' + i + ' p').attr('id', 'win');
                    $('#mini-game-' + i + ' p').html('Completed');
                }
            }
        }, 700);

    }, 1000);
}

function blink_text() {
    $('.timer p').fadeOut(50);
    $('.timer p').fadeIn(50);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  SWITCH Game JS  ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let switchArrEz = [1, 1, 0, 1, 0];
let switchArrMed = [0, 0, 1, 0, 1, 1, 1];
let switchArrHrd = [1, 1, 1, 1, 0, 0, 1, 0, 1, 1];
let compArr = [];
let correctSwitch = 0;
let ranSwitch = Math.floor(Math.random() * 3);

function checkSwitchOrder(mode) {
    if (mode == 0) {
        for (let i = 1; i <= 5; i++) {
            $('#s' + i).removeClass('hidden');
        }
    }
    else if (mode == 1) {
        for (let i = 1; i <= 7; i++) {
            $('#s' + i).removeClass('hidden');
        }
    }
    else if (mode == 2) {
        $('.switch').removeClass('hidden');
    }
}
checkSwitchOrder(ranSwitch);

function testSwitchOrder(mode) {
    if (mode == 0) {
        for (let i = 1; i <= 5; i++) {
            if ($('#s' + i).hasClass('up')) {
                compArr.push(1);
            }
            else if ($('#s' + i).hasClass('down')) {
                compArr.push(0);
            }
        }
        for (let j = 0; j <= 5; j++) {
            if (compArr[j] == switchArrEz[j]) {
                correctSwitch++;
            }
        }
        if ((correctSwitch - 1) == 5) {
            completedLights();
            let miniGameID = $('.switch-game-con').parent().attr('id');
            $('#' + miniGameID).addClass('finished');
        }
        else {
            count = 1;
            displayCount(count);
        }
    }
    else if (mode == 1) {
        for (let i = 1; i <= 7; i++) {
            if ($('#s' + i).hasClass('up')) {
                compArr.push(1);
            }
            else if ($('#s' + i).hasClass('down')) {
                compArr.push(0);
            }
        }
        for (let j = 0; j <= 7; j++) {
            if (compArr[j] == switchArrMed[j]) {
                correctSwitch++;
            }
        }
        if ((correctSwitch - 1) == 7) {
            completedLights();
            let miniGameID = $('.switch-game-con').parent().attr('id');
            $('#' + miniGameID).addClass('finished');
        }
        else {
            count = 1;
            displayCount(count);
        }
    }
    else if (mode == 2) {
        for (let i = 1; i <= 10; i++) {
            if ($('#s' + i).hasClass('up')) {
                compArr.push(1);
            }
            else if ($('#s' + i).hasClass('down')) {
                compArr.push(0);
            }
        }
        for (let j = 0; j <= 10; j++) {
            if (compArr[j] == switchArrHrd[j]) {
                correctSwitch++;
            }
        }
        if ((correctSwitch - 1) == 10) {
            completedLights();
            let miniGameID = $('.switch-game-con').parent().attr('id');
            $('#' + miniGameID).addClass('finished');
        }
        else {
            count = 1;
            displayCount(count);
        }
    }
}

$('.test-switch').click(function() {
    testSwitchOrder(ranSwitch);
    $('.test-switch').css({
        'pointer-events' : 'none'
    });
});

function checkSwitch() {
    if ($(this).hasClass('up')) {
        $(this).removeClass('up');
        $(this).addClass('down');
        $(this).css({
            'top' : '50%'
        });
    }
    else if ($(this).hasClass('down')) {
        $(this).removeClass('down');
        $(this).addClass('up');
        $(this).css({
            'top' : '0'
        });
    }
}

$('.switch').click(checkSwitch);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Hacking Game JS  //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var hackDif = 0;
var hackCount = 1;
var hackCountRev = 6;
var hackTry = 2;
var ranMode = Math.floor(Math.random() * 3) + 1;
var correctCode = 100000 + Math.floor(Math.random() * 900000);

$('.miniGameNum').click(function() {
    if (proBarCount != 1) {
        hackMills = 25000;
    }
    else {
        hackMills = 5000;
    }
    if (hackDif == 1) {
        if ($(this).html() == hackCount) {
            $(this).addClass('hidden');
            hackCount++;
        }
        else {
            $('.miniGameNum').removeClass('hidden');
            shuffle(hackArr);
            for (let i = 0; i < 6; i++) {
                $('#num' + (i + 1)).html(hackArr[i]);
            }
            hackTry--;
            hackCount = 1;
        }
    }
    else if (hackDif == 2) {
        if (proBarCount != 2) {
            hackMills = 30000;
        }
        else {
            hackMills = 5000;
        }
        if ($(this).html() == hackCount) {
            $(this).addClass('hidden');
            hackCount += 2;
        }
        else {
            $('.miniGameNum').removeClass('hidden');
            shuffle(hackArr);
            for (let i = 0; i < 6; i++) {
                $('#num' + (i + 1)).html(hackArr[i]);
            }
            hackTry--;
            hackCount = 1;
        }
    }
    else if (hackDif == 3) {
        if (proBarCount != 3) {
            hackMills = 125000;
        }
        else {
            hackMills = 5000;
        }
        if ($(this).html() == hackCountRev) {
            $(this).addClass('hidden');
            hackCountRev--;
        }
        else {
            $('.miniGameNum').removeClass('hidden');
            shuffle(hackArr);
            for (let i = 0; i < 6; i++) {
                $('#num' + (i + 1)).html(hackArr[i]);
            }
            hackTry--;
            hackCountRev = 6;
        }
    }
    if (hackCount == 7 || hackCountRev == 0) {
        $('.miniGameNum').removeClass('hidden');
        $('.hacking-miniGame').addClass('hidden');
        $('.pro-bar').css({
            'background-color' : 'limegreen',
            'transition' : 'none'
        });
        setTimeout(function() {
            $('.pro-bar').css({
                'width' : '100%',
                'transition' : hackMills + 'ms',
            });
        }, 100);
        hackCount = 1;
        hackCountRev = 6;
        stopProBar(hackDif);
    }
    if (hackTry == 0) {
        count = 1;
        displayCount(count);
    }
});

var hackArr = [1, 2, 3, 4, 5, 6];
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

let proBarCount = 0;
let modeOne = 0;
function stopProBar(mode) {
    var ProBarCheck = setInterval( function() {
        let curWidth = $(".pro-bar").width() / $('.pro-bar').parent().width() * 100;
        if(Math.floor(curWidth) >= 100){
            let proBarWidth = $(".pro-bar").width() / $('.pro-bar').parent().width() * 100;
            if (proBarWidth == 100) {
                $('.code-pad-code').html(correctCode);
                $('.pro-bar').css({
                    'transition' : 'none'
                });
                $('.hacking-con').addClass('hidden');
                clearInterval(ProBarCheck);
            }
        }
    }, 1000/60);

    let curWidth = $(".pro-bar").width() / $('.pro-bar').parent().width() * 100;
    if (proBarCount != 3) {
        setTimeout(function() {
            let ran = Math.floor(Math.random() * 3);
            if (ran > 0 && Math.floor(curWidth) != 100) {
                startHackMiniGame(mode);
                proBarCount++;
            }
            else {
                proBarCount++;
                modeOne++;
                stopProBar(mode);
            }
            
        }, 24000);
    }
}

function startHackMiniGame(mode) {
    let curWidth = $(".pro-bar").width() / $('.pro-bar').parent().width() * 100;
    hackDif = mode;
    console.log(mode);
    if (mode == 1 && modeOne != 1 && Math.floor(curWidth) != 100 && Math.floor(curWidth) < 99) {
        $('.pro-bar').css({
            'width' : Math.floor(curWidth) + '%',
            'transition' : 'none',
            'background-color' : '#FF0000'
        });
        $('.hacking-miniGame').removeClass('hidden');
        $('.miniGameNum').css({
            'background-color' : 'rgba(10, 185, 10, 0.5)',
            'border' : '3px solid rgb(10, 185, 10)'
        });
        shuffle(hackArr);
        for (let i = 0; i < 6; i++) {
            $('#num' + (i + 1)).html(hackArr[i]);
        }
    }
    else if (mode == 2 && Math.floor(curWidth) != 100 && Math.floor(curWidth) < 99) {
        $('.pro-bar').css({
            'width' : Math.floor(curWidth) + '%',
            'transition' : 'none',
            'background-color' : 'red'
        });
        $('.hacking-miniGame').removeClass('hidden');
        $('.miniGameNum').css({
            'background-color' : 'rgba(255, 232, 25, 0.5)',
            'border' : '3px solid rgb(255, 232, 25)'
        });
        shuffle(hackArr);
        for (let i = 0; i < 6; i++) {
            $('#num' + (i + 1)).html(hackArr[i]);
        }
    }
    else if (mode == 3 && Math.floor(curWidth) != 100 && Math.floor(curWidth) < 99) {
        $('.pro-bar').css({
            'width' : Math.floor(curWidth) + '%',
            'transition' : 'none',
            'background-color' : 'red'
        });
        $('.hacking-miniGame').removeClass('hidden');
        $('.miniGameNum').css({
            'background-color' : 'rgba(185, 10, 10, 0.5)',
            'border' : '3px solid rgb(185, 10, 10)'
        });
        shuffle(hackArr);
        for (let i = 0; i < 6; i++) {
            $('#num' + (i + 1)).html(hackArr[i]);
        }
    }
}

function proBar(mode) {
    if (mode == 1) {
        //50000
        $('.pro-bar').css({
            'width' : '100%',
            'transition' : '50000ms'
        });
        stopProBar(mode);
    }
    else if (mode == 2) {
        //70000
        $('.pro-bar').css({
            'width' : '100%',
            'transition' : '70000ms'
        });
        stopProBar(mode);
    }
    else if (mode == 3) {
        //150000
        $('.pro-bar').css({
            'width' : '100%',
            'transition' : '150000ms'
        });
        stopProBar(mode);
    }
}

$('.code-pad-enter').click(function() {
    if (correctCode == $('.code-pad-code').html()) {
        $('.code-pad-enter').css({
            'pointer-events' : 'none'
        });
        completedLights();
        let miniGameID = $('.code-pad-con').parent().attr('id');
        $('#' + miniGameID).addClass('finished');
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Wire Game JS  /////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var delayWire = 0;
var redCount = 2;
var blueCount = 3;
var correctWires = 0;
function checkWireCut(wire, colorSet, choice) {
    if (colorSet == 0) {
        if ($(choice).children('.wire-top').hasClass('wire-white') && $(choice).hasClass('cut')) {
            delayWire = 1;
            if (redCount > 0) {
                count = 1;
                displayCount(count);
            }
        }
        else if (choice == wire[0] || choice == wire[1] || choice == wire[2] && delayWire == 0) {
            redCount--;
        }
        else {
            count = 1;
            displayCount(count);
        }
        if (delayWire == 1 && redCount == 0) {
            completedLights();
            let miniGameID = $('.cut-wire-con').parent().attr('id');
            $('#' + miniGameID).addClass('finished');
        }
    }
    else if (colorSet == 1) {
        if ($(choice).children('.wire-top').hasClass('wire-green') && $(choice).hasClass('cut')) {
            delayWire = 1;
            if (blueCount > 0) {
                count = 1;
                displayCount(count);
            }
        }
        else if (choice == wire[0] || choice == wire[1] || choice == wire[2] || choice == wire[3] && delayWire == 0) {
            blueCount--;
        }
        else {
            count = 1;
            displayCount(count);
        }
        if (delayWire == 1 && blueCount == 0) {
            completedLights();
            let miniGameID = $('.cut-wire-con').parent().attr('id');
            $('#' + miniGameID).addClass('finished');
        }
    }
    else if (colorSet == 2) {
        if (correctWires == 0) {
            correctWires = (6 - wire.length);
        }
        for(let i = 0; i < 5; i++){
            if (choice == wire[i]){
                count = 1;
                displayCount(count);
            }
        }
        correctWires--;
        if (correctWires == 0) {
            completedLights();
            let miniGameID = $('.cut-wire-con').parent().attr('id');
            $('#' + miniGameID).addClass('finished');
        }
    }
}

jQuery.extend( jQuery.fn, {
    // Name of our method & one argument (the parent selector)
    within: function( pSelector ) {
        // Returns a subset of items using jQuery.filter
        return this.filter(function(){
            // Return truthy/falsey based on presence in parent
            return $(this).closest( pSelector ).length;
        });
    }
});

function collisionDet(index) {
    let scannerPiece = $(".scan");
    let scanPart = scannerPiece[0].getBoundingClientRect();
    if (index == 2) {
        for(let i = 1; i <= 6; i++){
            let wirePiece = $("#wire" + i);
            let wireBox = wirePiece[0].getBoundingClientRect();
            let redWires = [...new Set(cutWire)];
            if(
                !(scanPart.right < wireBox.left || 
                    scanPart.left > wireBox.right || 
                    scanPart.bottom < wireBox.top || 
                    scanPart.top > wireBox.bottom)
            ) {
                $(".dec-top-red").within(redWires[i - 1]).css({
                    'border-top' : '20px solid yellow',
                    'border-right' : '20px solid yellow'
                });
                $('.dec-bottom-red').within(redWires[i - 1]).css({
                    'border-bottom' : '20px solid yellow',
                    'border-right' : '20px solid yellow'
                });
                $('.wire-red').within(redWires[i - 1]).css({
                    'border-right' : '20px solid yellow'
                });
            }
            else {
                $(".dec-top-red").within(redWires[i - 1]).css({
                    'border-top' : '20px solid #8b0000',
                    'border-right' : '20px solid #8b0000'
                });
                $('.dec-bottom-red').within(redWires[i - 1]).css({
                    'border-bottom' : '20px solid #8b0000',
                    'border-right' : '20px solid #8b0000'
                });
                $('.wire-red').within(redWires[i - 1]).css({
                    'border-right' : '20px solid #8b0000'
                });
            }
        }
    }
}

var cutWire = [];
function setWires(colorSetIndex) {
    //first set of colors
    if (colorSetIndex == 0) {
        for (let i = 1; i <= 6; i++) {
            let wire = "#wire" + i;
            if ($(wire).children('.wire-dec-top').hasClass('dec-top-red')
            || $(wire).children('.wire-dec-top').hasClass('dec-top-white')) {
                cutWire.push(wire);
            }
        }
    }
    //second set of colors
    else if (colorSetIndex == 1) {
        for (let i = 1; i <= 6; i++) {
            let wire = "#wire" + i;
            if ($(wire).children('.wire-dec-top').hasClass('dec-top-blue')
            || $(wire).children('.wire-dec-top').hasClass('dec-top-green')) {
                cutWire.push(wire);
            }
        }
    }
    //all red
    else if (colorSetIndex == 2) {
        for (let i = 0; i < 5; i++) {
            let rand = Math.ceil(Math.random() * 6);
            let wire = "#wire" + rand;
            cutWire.push(wire);
        }
    }
}

var randColorIndex;
function randomWires() {
    //sets random order for wire colors
    let wireOrderArr = [1, 2, 3, 4, 5, 6];
    let wireRandOrderArr = [];
    let wireCount = 6

    for (let i = 0; i < 6; i++) {
        let rand = Math.floor(Math.random() * wireCount);

        wireRandOrderArr.push(wireOrderArr[rand]);
        wireOrderArr.splice(rand, 1);
        wireCount--;
    }

    //selects wire color set for color then colors it
    randColorIndex = Math.floor(Math.random() * 3);
    let wireColors = [
        ["red", "blue", "red", "yellow", "green", "white"],
        ["blue", "blue", "red", "yellow", "green", "blue"],
        ["red", "red", "red", "red", "red", "red"],
    ];

    let selectedColorSet = wireColors[randColorIndex];
    let colorCount = 6;
    for (let i = 0; i < 6; i++) {
        let randColor = Math.floor(Math.random() * colorCount);
        let wireId = "#wire" + wireRandOrderArr[i];
        let wireDecTop = "dec-top-" + selectedColorSet[randColor];
        let wire = "wire-" + selectedColorSet[randColor];
        let wireDecBottom = "dec-bottom-" + selectedColorSet[randColor];
        selectedColorSet.splice(randColor, 1);

        $(wireId).children('.wire-dec-top').addClass(wireDecTop);
        $(wireId).children('.wire-top, .wire-bottom').addClass(wire);
        $(wireId).children('.wire-dec-bottom').addClass(wireDecBottom);

        colorCount--;
    }
    setWires(randColorIndex);
}
randomWires();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Tool JS  //////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toolDetection() {
    //wire cutter tool
    if($('#wire').hasClass('selected-tool')) {
        $(this).children('.wire-top, .wire-bottom').addClass('wires-cut');
        $(this).children('.wire-cut').css({
            'height' : '20%'
        });
        $(this).addClass('cut');
        let choice = "#" + $(this).attr('id');
        let noDupes = [...new Set(cutWire)];
        checkWireCut(noDupes, randColorIndex, choice);
    }

    //scanner tool
    if($('#scan').hasClass('selected-tool')) {
        $('.scan-con').removeClass('hidden');
        $(document).on('mousemove', function(e){
            $('.scan-con').css({
               left:  e.pageX,
               top:   e.pageY
            });
            collisionDet(randColorIndex);
        });
    }
    else {
        $('.scan-con').addClass('hidden');
        $(document).unbind("mousemove");
    }

    //pry tool
    if($('#pry').hasClass('selected-tool')) {
        $('#pan-img').click(function() {
            $('#pan-img').addClass('hidden');
        });
    }

    if($('#hacking').hasClass('selected-tool')) {
        $('.code-pad-panel').click(function() {
            $('.hacking-con').removeClass('hidden');
            proBar(ranMode);
        });
    }
}

$('.tool').click(selectTools);
$('#scan').click(toolDetection);
$('#pry').click(toolDetection);
$('#hacking').click(toolDetection);
$('.wire-con').click(toolDetection);

function selectTools() {
    if ($(this).hasClass('selected-tool')) {
        $(this).removeClass('selected-tool');
        $('.tool').removeClass('disabled-tool');
    }
    else if($('.selected-tool').length == 0) {
        $(this).addClass('selected-tool');
        $('.tool').addClass('disabled-tool');
        $(this).removeClass('disabled-tool');
        if($('#pry').hasClass('selected-tool')) {

        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  HAND BOOK JS  /////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openBook() {
    if ($('.openBook').hasClass('open')) {
        $('.handBook-con').css({
            'left' : '-37.2%'
        });
        $('.openBook').html('> Hand Book >');
        $('.openBook').removeClass('open');
        
        $('.mini-gameInfo-Expanded').css({
            'left' : '-50%'
        });
        keyCount = 0;
    }
    else {
        $('.handBook-con').css({
            'left' : '0'
        });
        $('.openBook').html('< Hand Book <');
        $('.openBook').addClass('open');
        if ($('.mini-gameExpand').hasClass('open')) {
            $('.mini-gameInfo-Expanded').css({
                'left' : '40%'
            });
        }
        else {
            $('.mini-gameInfo-Expanded').css({
                'left' : '-50%'
            });
        }
        keyCount = 1;
    }
}

function expand() {
    if ($(this).hasClass('open')) {
        $('.mini-gameInfo-Expanded').css({
            'left' : '-50%'
        });
        $('.mini-gameExpand').removeClass('open');
        $('.mini-gameExpand').removeClass('disabled');
        $(this).html('More Info');
        if ($(this).attr('id') == 'mgInfo-1') {
            $('.wire-info').css({
                'height' : '0'
            });
            $('.wire-info').addClass('hidden');
        }
        else if ($(this).attr('id') == 'mgInfo-2') {
            $('.code-info').css({
                'height' : '0'
            });
            $('.code-info').addClass('hidden');
        }
        else if ($(this).attr('id') == 'mgInfo-3') {
            $('.switch-info').css({
                'height' : '0'
            });
            $('.switch-info').addClass('hidden');
        }
    }
    else if($(".open").length <= 1){
        $('.mini-gameInfo-Expanded').css({
            'left' : '40%'
        });
        $('.mini-gameExpand').addClass('disabled');
        $(this).addClass('open');
        $(this).removeClass('disabled');
        $(this).html('View Less');
        if ($(this).attr('id') == 'mgInfo-1') {
            $('.wire-info').css({
                'height' : 'auto'
            });
            $('.wire-info').removeClass('hidden');
        }
        else if ($(this).attr('id') == 'mgInfo-2') {
            $('.code-info').css({
                'height' : 'auto'
            });
            $('.code-info').removeClass('hidden');
        }
        else if ($(this).attr('id') == 'mgInfo-3') {
            $('.switch-info').css({
                'height' : 'auto'
            });
            $('.switch-info').removeClass('hidden');
        }
    }
}

$('.openBook').click(openBook);
$('.mini-gameExpand').click(expand);

var keyCount = 0;
$(this).on('keypress', function(event) {
    if (event.keyCode == 68 || event.keyCode == 100 && keyCount == 0) {
        openBook();
        keyCount = 1;
    }
});

$(this).on('keypress', function(event) {
    if (event.keyCode == 65  || event.keyCode == 97 && keyCount == 1) {
        openBook();
        keyCount = 0;
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  PAGES JS  /////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#next').click(function() {
    $('#prev').removeClass('hidden');
    $('#next').addClass('hidden');

    $('.page-1').css({
        'left' : '-100%',
        'transition' : 'none'
    });

    $('.page-2').css({
        'right' : '50%',
        'transition' : '300ms'
    });
});

$('#prev').click(function() {
    $('#prev').addClass('hidden');
    $('#next').removeClass('hidden');

    $('.page-1').css({
        'left' : '0',
        'transition' : '300ms'
    });

    $('.page-2').css({
        'right' : '0',
        'transition' : 'none'
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  MISC JS  //////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var lightCount = 0;

function completedLights() {
    lightCount++;
    $('#l' + lightCount).addClass('completed');
    if (lightCount == 3) {
        completed = 1;
        count = 1;
        displayCount(count);
        $('#victory').removeClass('hidden');
    }
}
