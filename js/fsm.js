//Setup
var fsmActual = document.createElement('div');
fsmActual.setAttribute('id', 'fsm_actual');
document.body.appendChild(fsmActual);
var $fsm = document.querySelectorAll('.fsm');
var $fsm_semi = document.querySelectorAll('.fsm_semi');
var $fsmActual = document.querySelector('#fsm_actual');
$fsmActual.style.position = "absolute";

var position = {};
var size = {};


//modal action stuffs
var openFSM = function(event) {
	var $this = event.currentTarget;
    var clientRect = $this.getBoundingClientRect();
    position = {
        top: $this.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
        left: clientRect.left
    }

	size = {
		width: window.getComputedStyle($this).width,
		height: window.getComputedStyle($this).height
	}
	
	$fsmActual.style.position = "absolute";
    $fsmActual.style.top = position.top + 'px';
	$fsmActual.style.left = position.left + 'px';
	$fsmActual.style.height = size.height;
	$fsmActual.style.width = size.width;
    $fsmActual.style.margin = $this.style.margin;
    document.body.classList.add('no-scroll');
	
	setTimeout(function(){
        $fsmActual.innerHTML = $this.innerHTML;
		var classes = $this.classList.value.split(' ');
		for (var i = 0; i < classes.length; i++) {
			$fsmActual.classList.add(classes[i]);
		}
		$fsmActual.classList.add('growing');
		$fsmActual.style.height = '100vh';
		$fsmActual.style.width = '100vw';
        $fsmActual.style.top = window.pageYOffset + 'px';
		$fsmActual.style.left = '0';
		$fsmActual.style.margin = '0';
	}, 1);
	
	setTimeout(function(){
		$fsmActual.classList.remove('growing');
		$fsmActual.classList.add('full-screen')
	}, 1000);
};


var closeFSM = function(event){
	var $this = event.currentTarget;
	
	$this.style.height = size.height;
	$this.style.width = size.width;
	$this.style.top = position.top + 'px';
	$this.style.left = position.left + 'px';
	$this.style.margin = '0';
	$this.classList.remove('full-screen');
	$this.classList.add('shrinking');
    enableScroll();
	
	setTimeout(function(){
		while($this.firstChild) $this.removeChild($this.firstChild);
		var classList = $this.classList;
		while (classList.length > 0) {
			 classList.remove(classList.item(0));
		}
		$this.style = '';;
	}, 100);
};

for (var i = 0; i < $fsm.length; i++) {
	$fsm[i].addEventListener("click", openFSM);
}
$fsmActual.addEventListener("click", closeFSM);

//$fsm_semi 
var openFSM_semi = function(event) {
	var $this = event.currentTarget;
    var clientRect = $this.getBoundingClientRect();
    position = {
        top: $this.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
        left: clientRect.left
    }

	size = {
		width: window.getComputedStyle($this).width,
		height: window.getComputedStyle($this).height
	}
	
	$fsmActual.style.position = "absolute";
    $fsmActual.style.top = position.top + 'px';
	$fsmActual.style.left = position.left + 'px';
	$fsmActual.style.height = size.height;
	$fsmActual.style.width = size.width;
    $fsmActual.style.margin = $this.style.margin;

    
    document.body.classList.add('no-scroll');
    disableScroll();
	
	setTimeout(function(){
        $fsmActual.innerHTML = $this.innerHTML;
		var classes = $this.classList.value.split(' ');
		for (var i = 0; i < classes.length; i++) {
			$fsmActual.classList.add(classes[i]);
		}
		$fsmActual.classList.add('growing');
		$fsmActual.style.height = '90vh';
		$fsmActual.style.width = '90vw';
        $fsmActual.style.top = (window.pageYOffset +window.innerHeight*0.05)+ 'px';
		$fsmActual.style.left = '5vw';
		$fsmActual.style.margin = '0';
	}, 1);
	
	setTimeout(function(){
		$fsmActual.classList.remove('growing');
		$fsmActual.classList.add('full-screen')
	}, 1000);
};
for (var i = 0; i < $fsm_semi.length; i++) {
	$fsm_semi[i].addEventListener("click", openFSM_semi);
}

//indirect refernce 
var openFSM_semi_for = function($this) {
    var clientRect = $this.getBoundingClientRect();
    position = {
        top: $this.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
        left: clientRect.left
    }

	size = {
		width: window.getComputedStyle($this).width,
		height: window.getComputedStyle($this).height
	}
	
	$fsmActual.style.position = "absolute";
    $fsmActual.style.top = position.top + 'px';
	$fsmActual.style.left = position.left + 'px';
	$fsmActual.style.height = size.height;
	$fsmActual.style.width = size.width;
    $fsmActual.style.margin = $this.style.margin;

    
    document.body.classList.add('no-scroll');
    disableScroll();
	
	setTimeout(function(){
        $fsmActual.innerHTML = $this.innerHTML;
		var classes = $this.classList.value.split(' ');
		for (var i = 0; i < classes.length; i++) {
			$fsmActual.classList.add(classes[i]);
		}
		$fsmActual.classList.add('growing');
		$fsmActual.style.height = '90vh';
		$fsmActual.style.width = '90vw';
        $fsmActual.style.top = (window.pageYOffset +window.innerHeight*0.05)+ 'px';
		$fsmActual.style.left = '5vw';
		$fsmActual.style.margin = '0';
	}, 1);
	
	setTimeout(function(){
		$fsmActual.classList.remove('growing');
		$fsmActual.classList.add('full-screen')
	}, 1000);
};