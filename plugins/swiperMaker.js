;(function(window, jQuery) {
 
        var SwiperMaker = function(o) { 
 
            var that = this;
            this.config = o;
            this.control = false;
            this.sPos = {};
            this.mPos = {};
            this.dire;
     
            // this.config.bind.addEventListener('touchstart', function(){ return that.start(); } ,false);
            // 这样不对的，event对象只在事件发生的过程中才有效;
            $(this.config.bind).get(0).addEventListener('touchstart', function(e) { return that.start(e); } ,false);
            $(this.config.bind).get(0).addEventListener('touchmove', function(e) { return that.move(e); } ,false);
            $(this.config.bind).get(0).addEventListener('touchend', function(e) { return that.end(e); } ,false);
 			
 			this.bind = $(this.config.bind);
		}
        
        SwiperMaker.prototype.start = function(e) {
             
             var point = e.touches ? e.touches[0] : e;
             this.sPos.x = point.screenX;
             this.sPos.y = point.screenY;
             
        }
        SwiperMaker.prototype.move = function(e) {  
 
            var point = e.touches ? e.touches[0] : e;
            this.control = true;
            this.mPos.x = point.screenX;
            this.mPos.y = point.screenY;
            
        }
 
        SwiperMaker.prototype.end = function(e) {
        	
            this.config.dire_h  && (!this.control ? this.dire = null : this.mPos.x > this.sPos.x ? this.dire = 'R' : this.dire = 'L')
            this.config.dire_h  || (!this.control ? this.dire = null : this.mPos.y > this.sPos.y ? this.dire = 'D' : this.dire = 'U')
 
            this.control = false;
            if (Math.abs(this.sPos.x - this.mPos.x) > 30) {
        		this.config.backfn(this);	
			}
            
        }
 
        window.SwiperMaker = SwiperMaker;
 
}(window, jQuery));