<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <script type="text/javascript">
            var djConfig = { 
            		         parseOnLoad: true,
            		         baseUrl: "/js/dojo/"
            		       };
        </script>
        <script type="text/javascript" src="/js/dojo/dojo.js">
        </script>
        <script type="text/javascript">
        dojo.addOnLoad(function(){
        	console.log(dojo.byId("messageParam").textContent);
        });
        </script>
    </head>
    
    <body>
       <div id="messageParam">
       </div>
    </body>
</html>