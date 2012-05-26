dojo.provide("com.company.product.widget.SaveCancelCommandBar");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.Button");

dojo.require("dojo.i18n");
dojo.requireLocalization("com.company.product.widget", 
                         "SaveCancelCommandBarRes");

dojo.declare("com.company.product.widget.SaveCancelCommandBar",
             [dijit._Widget, dijit._Templated],{
    messageBundle : {},
    
    templatePath: dojo.moduleUrl("com.company.product.widget", 
                                 "template/SaveCancelCommandBar.html"),
    
    widgetsInTemplate: true,
    
    constructor : function () {
                      this.messageBundle = dojo.i18n.getLocalization("com.company.product.widget", 
                                                                        "SaveCancelCommandBarRes");        
                  },
                  
    onSave: null,  // function( /*Event*/ e) { .. }
    onCancel: null, // function( /*Event*/ e) { .. }

    // private members
    _onSaveClicked : function (/*event*/ e) {
                         console.log("this.btnSave = " + this.btnSave);
                         if (dojo.isFunction(this.onSave)) this.onSave(e);
                     },
    _onCancelClicked : function (/*event*/ e) {
                           console.log("this.btnCancel = " + this.btnCancel);
                           if (dojo.isFunction(this.onSave)) this.onCancel(e);
                       }
});