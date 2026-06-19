var seasonName = prompt("Enter your favourite Season name");
if (seasonName === "Summer" || seasonName === "summer") {
    document.write(`
    <div class="animation">
    <div class="sun"></div>
    <h1 class="animate__animated animate__rubberBand">Summer</h1>
 </div>
<div class="parent parent-sum">
  <div class="image">
    <img class="image-weather" src="./asset/summer-prod.jfif" alt="summer">
  </div>
  <div class="weather">
    <h4>SUMMER</h4>
    <p class="temp">
      <span>32 <sup>o</sup>C</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M13 15.28V5.5a1 1 0 0 0-2 0v9.78A2 2 0 0 0 10 17a2 2 0 0 0 4 0a2 2 0 0 0-1-1.72M16.5 13V5.5a4.5 4.5 0 0 0-9 0V13a6 6 0 0 0 3.21 9.83A7 7 0 0 0 12 23a6 6 0 0 0 4.5-10m-2 7.07a4 4 0 0 1-6.42-2.2a4 4 0 0 1 1.1-3.76a1 1 0 0 0 .3-.71V5.5a2.5 2.5 0 0 1 5 0v7.94a1 1 0 0 0 .3.71a4 4 0 0 1-.28 6Z" />
</svg></span></p>
  </div>
</div>`)
} else if (seasonName === "Winter" || seasonName === "winter") {
       document.write(`
        <div class="snowflakes" aria-hidden="true">
  <div class="snowflake">
  ❅
  </div>
  <div class="snowflake">
  ❅
  </div>
  <div class="snowflake">
  ❆
  </div>
  <div class="snowflake">
  ❄
  </div>
  <div class="snowflake">
  ❅
  </div>
  <div class="snowflake">
  ❆
  </div>
  <div class="snowflake">
  ❄
  </div>
  <div class="snowflake">
  ❅
  </div>
  <div class="snowflake">
  ❆
  </div>
  <div class="snowflake">
  ❄
  </div>
</div>
 <h1 class="winterh1 animate__animated animate__zoomInDown">Winter</h1>
<div class="parent">
  <div class="image">
    <img class="image-weather" src="./asset/winter-png.png" alt="winter">
  </div>
  <div class="weather">
    <h4>WINTER</h4>
    <p class="temp">
      <span>-10<sup>o</sup>C</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M13 15.28V5.5a1 1 0 0 0-2 0v9.78A2 2 0 0 0 10 17a2 2 0 0 0 4 0a2 2 0 0 0-1-1.72M16.5 13V5.5a4.5 4.5 0 0 0-9 0V13a6 6 0 0 0 3.21 9.83A7 7 0 0 0 12 23a6 6 0 0 0 4.5-10m-2 7.07a4 4 0 0 1-6.42-2.2a4 4 0 0 1 1.1-3.76a1 1 0 0 0 .3-.71V5.5a2.5 2.5 0 0 1 5 0v7.94a1 1 0 0 0 .3.71a4 4 0 0 1-.28 6Z" />
</svg></span></p>
  </div>
</div>`)
} else if (seasonName === "Autumn" || seasonName === "autumn") {
   document.write(`
	<div class="loader">
    <span></span>
    <span></span>
    <span></span>
	  <span></span>
	  <span></span>
	  <span></span>
	  <span></span>
	  <span></span>
    <span></span>
    <span></span>
	  <span></span>
	  <span></span>
  </div>
 <h1 class="animate__animated animate__zoomInDown">Autumn</h1>
<div class="parent">
  <div class="image">
    <img class="image-weather" src="./asset/autumn-tree.webp" alt="autumn">
  </div>
  <div class="weather">
    <h4>AUTUMN</h4>
    <p class="temp">
      <span>20<sup>o</sup>C</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M13 15.28V5.5a1 1 0 0 0-2 0v9.78A2 2 0 0 0 10 17a2 2 0 0 0 4 0a2 2 0 0 0-1-1.72M16.5 13V5.5a4.5 4.5 0 0 0-9 0V13a6 6 0 0 0 3.21 9.83A7 7 0 0 0 12 23a6 6 0 0 0 4.5-10m-2 7.07a4 4 0 0 1-6.42-2.2a4 4 0 0 1 1.1-3.76a1 1 0 0 0 .3-.71V5.5a2.5 2.5 0 0 1 5 0v7.94a1 1 0 0 0 .3.71a4 4 0 0 1-.28 6Z" />
</svg></span></p>
  </div>
</div>`)
} else if (seasonName === "Spring" || seasonName === "spring") {
   document.write(`
    <div class="flower-container">
  <div class="flower">🌸</div>
  <div class="flower">🌸</div>
  <div class="flower">💮</div>
  <div class="flower">🌸</div>
  <div class="flower">💮</div>
  <div class="flower">🌸</div>
</div>
 <h1 class="animate__animated animate__zoomInDown">Spring</h1>
<div class="parent">
  <div class="image">
    <img class="image-weather" src="./asset/spring-img.png" alt="spring">
  </div>
  <div class="weather">
    <h4>SPRING</h4>
    <p class="temp">
      <span>25<sup>o</sup>C</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M13 15.28V5.5a1 1 0 0 0-2 0v9.78A2 2 0 0 0 10 17a2 2 0 0 0 4 0a2 2 0 0 0-1-1.72M16.5 13V5.5a4.5 4.5 0 0 0-9 0V13a6 6 0 0 0 3.21 9.83A7 7 0 0 0 12 23a6 6 0 0 0 4.5-10m-2 7.07a4 4 0 0 1-6.42-2.2a4 4 0 0 1 1.1-3.76a1 1 0 0 0 .3-.71V5.5a2.5 2.5 0 0 1 5 0v7.94a1 1 0 0 0 .3.71a4 4 0 0 1-.28 6Z" />
</svg></span></p>
  </div>
</div>`)
}

else {
    alert("invalid input");
}