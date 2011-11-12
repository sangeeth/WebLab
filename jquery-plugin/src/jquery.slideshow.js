/**
 * This plugin uses JQuery transition effects APIs like fadeIn and fadeOut 
 * to play a sequence of DIVs as a slideshow.
 * 
 * Refer sample at http://www.sangeethlabs.com/works/jquery/slideshow/slideshow.html    
 *   
 * @author Sangeeth
 * @version 1.0.06052010 
 */  
jQuery.fn.playAsSlideshow = function(options) {
    // define defaults and override with options, if available
    // by extending the default settings, we don't modify the argument
    var __options = jQuery.extend({
       blurringPeriod: 1000,  // 1 second
       displayPeriod: 2000,   // 2 seconds
    }, options);

    return this.each(function(){
       var id = this.id;
       
       // Create an instance of Slideshow for the selected HTML element.
       var slideshow = new Slideshow(id,__options);
       slideshow.play();
    });
};
/**
 * This class helps to play a collection of DIV child elements under a HTML 
 * element with id value refered by 'slideContainer'.
 * 
 * To get the best effect, it is recommended to keep the child DIV elements 
 * hidden initially.
 *  
 * For example: 
 * 
 * <div id="slideContainerId">
 *    <div style="display:none">....content comes here....</div>
 *    ...
 *    ... other slides come here ...
 *    ...     
 * </div>  
 *          
 * @author Sangeeth
 */    
function Slideshow(slideContainer, options) {
// private:  input fields
   this.slideContainer = slideContainer;
   this.blurringPeriod = options.blurringPeriod; 
   this.displayPeriod = options.displayPeriod; 
           
// private:  internal variables  
   this.slideIndex = 0;
   this.selectorExpression = "#"+slideContainer+" > div";
   this.slideCount = $(this.selectorExpression).length;
   
// private:  internal methods
   this.fadeIn = ___Slideshow_fadeIn;
   this.fadeOut = ___Slideshow_fadeOut;
      
// public:   exposed operations
   this.play = ___Slideshow_play;
}
function ___Slideshow_play() {
    this.fadeIn();
}    
function ___Slideshow_fadeIn() {
  var instance = this;
  $(this.selectorExpression).eq(this.slideIndex).fadeIn(this.blurringPeriod, function () {
       setTimeout(function(){instance.fadeOut()}, instance.displayPeriod);
    });                 
}
function ___Slideshow_fadeOut() {
   var instance = this;
   $(this.selectorExpression).eq(this.slideIndex).fadeOut(this.blurringPeriod, function(){
        instance.slideIndex++;
        instance.slideIndex%=instance.slideCount;
        instance.fadeIn(); 
   });
}