<script lang="ts">
  import Calculator from './Calculator.svelte';

  import {Theme} from 'carbon-components-svelte';
  import 'carbon-components-svelte/css/all.css';
</script>
<title>YourSleep</title>
<div class="absolute">
  <div class="relative left-3">
    <Theme
      render="toggle"
      toggle={{
        themes: ['g10', 'g90'],
        labelA: '☀️',
        labelB: '🌙'
      }}
      persist
      persistKey="__carbon-theme"
    />
  </div>
</div>

<Calculator />

<!--todo: add a bounce or some type of animation to the arrow-->
<div
  class="absolute left-1/2 bottom-3 z-20 w-3 h-3 border-b-2 border-r-2 border-solid rotate-45 border-white"
/>

<!-- content -->
<div class="flex mb-10">
  <div class="m-auto w-1/2 space-y-6">
    <div>
      <h1><u>About</u></h1>
      <p class="text-xl leading-loose">
        Our advanced sleep calculator estimates the best times to wake up or
        fall asleep. Depending on your age and specific <span style="color:brown">sleep cycle</span>, 
        several different times will be given. To tailor our calculator to
        your unique needs, you will be asked how you feel after waking up. As
        you continue to use the calculator and create more data, the given times
        will be more accurate to your sleep cycle.
      </p>
    </div>

    <div>
      <h1 id="sleep_cycles"><u>Sleep Cycles</u></h1>
      <p class="text-xl leading-loose">
        Have you ever noticed how sometimes you wake up feeling refreshed even
        when you sleep much less than usual? Or sometimes you feel tired even
        after sleeping more than usual? This is because of sleep cycles.</p>
        <p class="text-xl leading-loose"> 
          In
        short, while you sleep, your brain goes through 4 stages of sleep which
        last a total of around 90 to 120 minutes. Your level of fatigue depends
        on when you wake up within this cycle. The best time to feel energetic
        is to wake up at the end of each cycle.
      </p>
    </div>

    <div>
      <h1><u>Stages of Sleep Cycle</u></h1>
      <p class="text-xl leading-loose">
        Typically within one night you will repeat this
          cycle of four stages 4 to 6 times.
      </p>
      <br>
      <ul class="text-xl leading-loose space-y-2">
        <li>
          <em>Stage 1:</em> Your brain begins to slow down and you enter light sleep.
          (5%)
        </li>
        <li>
          <em>Stage 2:</em> Deeper sleep begins. You are less likely to be awakened as
          your heart rate and temperature drop. (45%)
        </li>
        <li>
          <em>Stage 3:</em> This is the deepest stage of sleep and the most difficult to
          wake from. At this point your body begins to repair. This stage is
          needed for a good night's sleep and being awoken during this time leads
          to mental fogginess. (25%)
        </li>
        <li>
          <em>Stage 4:</em> Dreaming starts at this stage. It is generally not considered
          a restful sleep stage. If you are awakened at this point you will also
          feel severely tired. (25%)
        </li>
      </ul>
    </div>
  </div>
</div>
