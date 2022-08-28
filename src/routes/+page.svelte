<script lang="ts">
  import 'carbon-components-svelte/css/all.css';
  import {Theme} from 'carbon-components-svelte';

  import Calculator from './Calculator.svelte';
</script>

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

<p class="absolute left-1/2 bottom-3 text-4xl">V</p>
<p class="absolute left-1/2 bottom-9 text-4xl">V</p>

<!-- content -->
<div class="flex mb-10">
  <div class="m-auto w-1/2 space-y-6">
    <div>
      <h1>📖 <u>About</u></h1>
      <p class="text-xl leading-loose">
        Our advanced sleep calculator learns from your sleeping habits and
        estimates accordingly the best times to wake up or fall asleep.
        Depending on your age and specific <span style="color:brown"
          >sleep cycle</span
        >, several different times will be given. To tailor our calculator to
        your unique needs, you will be asked how you feel after waking up. As
        you continue to use the calculator over time, the algorithm will be able
        to provide more accurate suggestions.
      </p>
    </div>

    <div>
      <h1 id="sleep_cycles">♻️ <u>Sleep Cycles</u></h1>
      <p class="text-xl leading-loose">
        Have you ever noticed how sometimes you wake up feeling refreshed even
        when you sleep much less than usual? Or sometimes you feel tired even
        after sleeping more than usual? This is because of sleep cycles.
      </p>
      <p class="text-xl leading-loose">
        In short, while you sleep, your brain goes through 4 stages of sleep
        which last a total of around 90 to 120 minutes. Your level of fatigue
        depends on when you wake up within this cycle. The best time to feel
        energetic is to wake up at the end of each cycle.
      </p>
    </div>

    <div>
      <h1>😴 <u>Stages of Sleep Cycle</u></h1>
      <p class="text-xl leading-loose">
        Typically within one night you will repeat this cycle of four stages 4
        to 6 times.
      </p>
      <br />
      <ul class="text-xl leading-loose space-y-2">
        <li>
          <em>Stage 1 (5%):</em> Your brain begins to slow down and you enter light
          sleep.
        </li>
        <li>
          <em>Stage 2 (45%):</em> Deeper sleep begins. You are less likely to be
          awakened as your heart rate and temperature drop.
        </li>
        <li>
          <em>Stage 3 (25%):</em> This is the deepest stage of sleep and the most
          difficult to wake from. At this point your body begins to repair. This
          stage is needed for a good night's sleep and being awoken during this time
          leads to mental fogginess.
        </li>
        <li>
          <em>Stage 4 (25%):</em> Dreaming starts at this stage. It is generally
          not considered a restful sleep stage. If you are awakened at this point
          you will also feel severely tired.
        </li>
      </ul>
    </div>

    <div>
      <h1>🔒 <u>Privacy</u></h1>
      <p class="text-xl leading-loose">
        We respect your privacy, and acknoledge that not everyone wants the
        internet to know about their sleep habits. Therefore, all data collected
        is stored on your browser, and never sent to a server.
      </p>
    </div>
  </div>
</div>
