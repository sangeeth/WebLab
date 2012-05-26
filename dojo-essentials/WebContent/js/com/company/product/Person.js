dojo.provide("com.company.product.Person");

dojo.declare("com.company.product.Person", [], {
    name : null,
    
    constructor : function(/*string*/ name) {
                      this.name = name;
                  },

    getName : function() {
                  return this.name;
              },
             
    setName : function(/*string*/ name) {
                  this.name = name;
              }
});