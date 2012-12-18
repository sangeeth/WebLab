<!DOCTYPE html>
<html>
    <head>
        <style type="text/css">
            @import url("http://ajax.googleapis.com/ajax/libs/dojo/1.6.1/dojo/resources/dojo.css");
            @import url("http://ajax.googleapis.com/ajax/libs/dojo/1.6.1/dijit/themes/dijit.css");
            @import url("http://ajax.googleapis.com/ajax/libs/dojo/1.6.1/dijit/themes/tundra/tundra.css");
        </style>
        
		<script type="text/javascript">
		var djConfig = {
		        parseOnLoad: true, 
		        locale : 'en-us',
		        baseUrl : '${pageContext.request.contextPath}/js/',
		        modulePaths: { 'com' : 'com' }
		};
		</script>
        <script src="http://ajax.googleapis.com/ajax/libs/dojo/1.6.1/dojo/dojo.xd.js"></script>
        </script>
        <script type="text/javascript">
            dojo.require("com.company.product.widget.SaveCancelCommandBar");
            
            function onSave(/*event*/ e) {
               console.log("Clicked 'Save' in command bar with id: " + dojo.attr(e.target, 'id'));              
            }
            
            function onCancel(/*event*/ e) {
               console.log("Clicked 'Cancel' in command bar with id: " + dojo.attr(e.target, 'id'));
            }
        </script>
    </head>
    
    <body class=" tundra ">
		<div dojoType="com.company.product.widget.SaveCancelCommandBar" 
		       onSave="onSave" 
		       onCancel="onCancel">
		</div>
    </body>
</html>