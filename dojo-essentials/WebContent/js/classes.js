function Person(/*string*/ name) {
   this.name = name;
   
   // Methods
   this.getName = Person_getName;
   this.setName = Person_setName;
}

function Person_getName() {
	return this.name;
}

function Person_setName(/*string*/ name) {
	this.name = name;
}

var gandhi = new Person("Gandhi");
console.log(gandhi.getName());

var netaji = new Person();
netaji.name = "Netaji";
console.log(netaji.name);
console.log(netaji.getName());