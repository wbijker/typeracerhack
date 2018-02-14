// Paste this script into your browser developer tools when you are ready to start typing
// You desired Word per minute.
var WPM = 99

// interval method to start typing. 
// called when ready for typing
function _startTyping(wpm, text, input) {
    // convert worder per minute to milliseconds per character
    var cps = (wpm / 60) * 5
    var timeout = 1000 / cps 
    
    var index = 0
    // Make sure user can't interfere with current automatic typing
    input.addEventListener('keydown', function(e) {
        e.preventDefault();
    }, true)

    var keypress = window.setInterval( function() {
        input.value += text[index++]
        
        // After setting textbox value we need to let typescript "refresh" the current proceedings.
        var e = new Event('keydown')
        input.dispatchEvent(e)

        // Stop the timer if done
        if (index >= text.length) {
            console.log('Done')
            window.clearInterval(keypress);
        }
    }, timeout)   
}


var input = document.querySelector('input');
var text = document.querySelector('span[unselectable]').parentNode.innerText

console.log('Text extracted to type:', text)
console.log('Need to type at ' + WPM + ' words per minute.')
console.log('Waiting for the green light...')

// txtInput-unfocused will be removed once you can start typing
// Poll with intervals of 5ms  
var ready = window.setInterval(function() {
    if (!input.classList.contains('txtInput-unfocused')) {
        console.log('Light is green. Start typing')
        _startTyping(WPM, text, input);
        window.clearInterval(ready);
    }
}, 5)
