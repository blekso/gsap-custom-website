console.clear();

var targetElement = document.querySelectorAll('.target')

// sets a 'controller' main timeline, so that we can controll all the tweens in one 'scroll' event listener
var scrollTL = gsap.timeline({paused: true})

for (var i = 0; i < targetElement.length; i++) {
  
  // set tween duration as pixel value (viewport height + element's height in this example)
  var duration = (window.innerHeight + targetElement[i].offsetHeight)*1.25; 
  
  // set tween start time as pixel value of element's top offset
  var sceneStart = targetElement[i].offsetTop;  
  
  // setup sub timeline to be added to 'controller' scrollTL
  tl = gsap.timeline()
  tl
    .to(targetElement[i], { 
        x: 100,
         opacity: 1,
        ease: 'power2.inOut', 
    })
    .to(targetElement[i], { 
        x: 0, 
        opacity: 1, 
        ease: 'power1.inOut',

    })
    .duration( duration );
  
 // add to 'controller' scrollTL
  scrollTL.add(tl, sceneStart)
};

// for rAF
var requestId = null;
// Only update on animation frames
window.addEventListener('scroll', function() {
  if (!requestId) {
    requestId = requestAnimationFrame(update);
  }
});

update();

function update() {
  // start time at bottom of viewport and scrub time as scrolled px value.
  scrollTL.time(window.pageYOffset + window.innerHeight);
  requestId = null;
}