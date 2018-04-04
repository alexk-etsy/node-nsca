function XorEncoder() {
	this.key = '';
	this.iv = '';
};

XorEncoder.prototype.validateKeySize = function(){

};

XorEncoder.prototype.open = function(key, iv){
	this.key = key;
	this.iv = iv;
};


XorEncoder.prototype.encrypt = function(buffer) {
    var encoding = 'binary'
	var value = buffer.toString(encoding);
    String.prototype.repeat = function(n) {
        var str = '';
        for (var i = 0; i < n; i++) {
            str += this;
        }
        return str;
    };

    function repeatString(toExtend, base) {
        var timesToRepeat = Math.ceil(base.length / toExtend.length);
        return toExtend.repeat(timesToRepeat);
    };


    function charArray(value) {
        var map = Array.prototype.map;
        var chars = map.call(value, function(x) {
            return x.charCodeAt(0);
        });
        return chars;
    };

    function joinCharCodes(a) {
        // var finalstring = "";
        // a.map(function(x){
        //     finalstring = finalstring + String.fromCharCode(x);
        // })
        var b = new Buffer(a,encoding);
        return b;
    }

    function xorArrays(a, b){
        var result = [];
        for (var i = 0; i < a.length; i++) {
            result[i] = a[i] ^ b[i];
        }
        return result;
    };

    var valueChars = charArray(value);
    if (this.key) {
        var repeatedPassChars = charArray(repeatString(this.key, value));
        var valueChars = xorArrays(valueChars, repeatedPassChars);
    }
    var repeatedIVChars = charArray(repeatString(this.iv, value));

    var post = xorArrays(valueChars, repeatedIVChars);

    return  joinCharCodes(post);
}


module.exports = XorEncoder;
