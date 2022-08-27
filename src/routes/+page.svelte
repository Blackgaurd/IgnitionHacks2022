<script lang="ts">
  import Calculator from './Calculator.svelte';

  import {Theme} from 'carbon-components-svelte';
  import 'carbon-components-svelte/css/all.css';
</script>

<div class="absolute">
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

<Calculator />

<!--todo: add a bounce or some type of animation to the arrow-->
<div
  class="absolute left-1/2 bottom-3 z-20 w-3 h-3 border-b-2 border-r-2 border-solid rotate-45 border-white"
/>

<!-- content -->
<h1>What are sleep cycles?</h1>
