function deepCopy() {
    this.name = 'abc';
    this.age = 18;
    this.func = function() {
        console.log(123);
    }
    // return {a: '456'};
}
let res = new deepCopy();
console.log(res.func);

