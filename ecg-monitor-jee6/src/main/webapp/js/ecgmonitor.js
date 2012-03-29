function ECGMonitor(canvasId) {
// public:   
   //this.parentId = parentId;
   this.canvasId = canvasId;	
   
// private:
   this._timer = null;
   this.canvasContext = null;
   
   this.pixelsPer100ms = 16; // 8 pixels/100ms = 25 mm/sec, 16 pixels/100ms = 50 mm / sec, 1mm=3pixels
   this.lowerLimit = 105;
   this.speed = 10;
   this.pixelsPerUnit = 5;
   this.dataIndex = 0;
   this.i=0;
   this.startX = 30;
   this.startY = 25;
   this.y_axis_scale = 5;
   
   this.paintWorker = null;
   
	 this.data = new Array(); 
	 
	 this.hasMore = function() {
		 				return this.data.length > 0;
	 				};
	 				
	 this.next = function() {
		             return this.data.shift();
	             };	   
	             
	 this.enque = function(list) {
		 console.log("Before", this.data.length);
		 
		 for(var i in list) {
			 this.data.push(list[i]); 
		 }
		  
		 
		  console.log("after", this.data.length);
		  
		  if (!this.paintWorker) {
			  var _this = this;
              this.paintWorker = setInterval(function(){
             	 _this.paint();
              }, 100);
		  }
	 };   
   
// public:
   this.startup = function() {
					   this.lastX=this.startX;
					   this.lastY=this.startY;   

	                 var canvas = $("#canvas")[0];
	                 this.canvasContext = canvas.getContext('2d');
	                 
	                 this.canvasWidth = canvas.width;
	                 this.canvasHeight = canvas.height;
	                 this.y_axis_y = this.canvasHeight;

	                 
	                 this.canvasContext.fillStyle = 'black';	
	                 this.canvasContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
	                 
	                 this.canvasContext.shadowBlur = 1;
	                 this.canvasContext.font = "15pt Times New Roman";
	                 this.canvasContext.textAlign = "center";
	                 this.canvasContext.textBaseline = "middle";
	                 this.canvasContext.fillStyle = "#ccc";
	                 this.canvasContext.fillText("II", 10, this.startY + this.canvasHeight/2 - 20);
	                 
	                 this.canvasContext.shadowBlur = 1;
	                 this.canvasContext.font = "12pt Arial";
	                 this.canvasContext.textAlign = "center";
	                 this.canvasContext.textBaseline = "middle";
	                 this.canvasContext.fillStyle = "green";
	                 this.canvasContext.shadowColor="yellow";
	                 this.canvasContext.shadowBlur= 1;
	                 this.canvasContext.fillText("1mV", this.startX, 10);

	                 this.canvasContext.shadowColor="#777";
	                 this.canvasContext.shadowBlur= 1;
	                 this.canvasContext.font = "14pt Arial";
	                 this.canvasContext.textAlign = "center";
	                 this.canvasContext.textBaseline = "middle";
	                 this.canvasContext.fillStyle = "#999";
	                 this.canvasContext.fillText("ECG Lead II", this.canvasWidth/2, 10);
	                 
	                 // Start y-axis		
	                 this.canvasContext.beginPath(); {
	                	   this.canvasContext.lineWidth = 1;
	                	   this.canvasContext.moveTo(this.startX-1, this.startY);
	                	   this.canvasContext.lineTo(this.startX-1, this.canvasHeight);
	                 }
	                 this.canvasContext.closePath();
	                 this.canvasContext.shadowBlur = 1;
	                 this.canvasContext.shadowColor="#ddd";
	                 this.canvasContext.strokeStyle = '#ccc';
	                 this.canvasContext.stroke();
	                 // End of y-axis	
	                 
	                 
	                 var _this = this;
	                 this.paintWorker = setInterval(function(){
	                	 _this.paint();
	                 }, 100);

                  };
   this.stop = function() {
	    
               };
   this.resume = function() {
	           
                 };
                 
   this.paint =  function() {
	   this.canvasContext.save();

	   this.canvasContext.fillStyle = 'black';
	 
	   this.canvasContext.shadowBlur= 0;
	   this.canvasContext.fillRect(this.lastX, this.startY, this.pixelsPer100ms, this.canvasHeight);
	   var diff = this.lastX+this.pixelsPer100ms - this.canvasWidth;
	   if (diff >= 0) {
		   this.canvasContext.fillRect(this.startX, this.startY, diff, this.canvasHeight);
	   }
	   
	   //this.canvasContext.scale(1.0,1.0);

	   stopPainting = false;

	   // Start wave
	   this.canvasContext.beginPath(); {
		   this.canvasContext.lineWidth = 1;
		   
		   var count = this.pixelsPer100ms; 
		   while(count>0) {
			   this.canvasContext.moveTo(this.lastX, this.lastY);

			   newX = this.startX + this.i;
			   
			   if  (!this.hasMore()) {
				   stopPainting = true; 
			   }
			   data = this.next();
			   newY = this.y_axis_y - ((data - this.lowerLimit) * this.y_axis_scale);
			   if (this.i==0 || newX > this.canvasWidth) {
				  newX = this.startX;
				  this.i = 0;
				  this.canvasContext.moveTo(newX, newY); 
			   }
			   this.canvasContext.lineTo(newX, newY);
			   
			   this.i++;
			   
			   this.lastX = newX;
			   this.lastY = newY;

			   count--;
		   }
	   }
	   this.canvasContext.closePath();
	   this.canvasContext.strokeStyle = 'green';
	   this.canvasContext.shadowColor="yellow";
	   this.canvasContext.shadowBlur= 2;
	   this.canvasContext.stroke();
	   // End of wave
	   
	   this.canvasContext.restore();
	   
	   if (stopPainting) {
		   clearInterval(this.paintWorker);
		   this.paintWorker = null;
		   
	   }
	 };
}