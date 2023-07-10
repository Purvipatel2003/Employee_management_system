function add(a,b){
    console.log(a+b);
    }
    
    function sub(a,b){
        console.log(a-b);
    }
    
    function mul(a,b){
        console.log(a*b);
    }
    
    module.exports.addition = add; // export
    module.exports.substraction=sub; // export
    module.exports.multiplication=mul; //export
    // add(25,20);
    // sub(25,20);
    // mul(25,20);
