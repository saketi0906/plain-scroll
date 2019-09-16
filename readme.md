Simple and lightweight size scroll library.

# Installing
~~~
npm install plain-scroll
~~~

# Usage
PlainScroll is simple to usage. If you are using a module bundler, insert the following code into your project.
~~~
import PlainScroll from 'plain-scroll';
~~~
Please use plain-scroll.min.js when using with script tag.
~~~
<script src="plain-scroll.min.js"></script>
~~~
Next, create a instance.
~~~
new PlainScroll();

// or set option
new PlainScroll({
  trigger: '.plain-scroll',
  duration: 1000,
  easing: 'easeOut'
  onScrollStart: () => console.log('start'),
  onScrollEnd: () => console.log('end')
});
~~~
Finally, attach the trigger name to anchor tag, 
prepare the element you want to scroll.
~~~
<a href="#to" class="plain-scroll">
<div id="to"></div>
~~~

# Option
You can set options at the same time you create an instance.  
## trigger
Class name for starting scrolling, set to anchor tag.
 Default set is '.plain-scroll'.
## duration
It is time to scroll to the destination. Default set is 1000 milliseconds.
## easing
Add inertia to the scroll. You can set either for 'linear', 'easeIn', 'easeOut', 'easeInOut'. Default set is 'easeOut'.
## callback
You can run any function at start and end of scroll.

# Support Borwser
Support for stable version in the modern browsers and Internet Explorer 11. 
- Chrome
- Firefox
- Safari
- Edge
- Internet Explorer 11

# License
MIT @darumock