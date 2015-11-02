var debug_mode = DEBUG_MODE;

var debug = {
    log(...args) {
        if(console && debug_mode){
            console.log(...args);
        }
    }
};

module.exports = debug;
