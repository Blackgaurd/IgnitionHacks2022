<script lang="ts">
  import {
    Dropdown,
    TimePicker,
    TimePickerSelect,
    SelectItem,
    Button,
    NumberInput
  } from 'carbon-components-svelte';
  import 'carbon-components-svelte/css/all.css';

  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';

  let userData: object;
  let cycleLength: number;
  let userAge: number;
  let inputedTime = '10:00';
  let meridiem = 'pm';

  let dropdownId = 'sleep';

  onMount(() => {
    let tmp: string | null;

    tmp = window.localStorage.getItem('userData');
    userData = tmp !== null ? JSON.parse(tmp) : {};

    tmp = window.localStorage.getItem('cycleLength');
    cycleLength = tmp !== null ? parseInt(tmp) : 90;

    tmp = window.localStorage.getItem('userAge');
    userAge = tmp !== null ? parseInt(tmp) : 1;
  });

  function optimalSleepMinutes(age: number) {
    let ret = {
      min: 0,
      max: 0
    };
    if (age < 1) {
      ret.min = 12;
      ret.max = 16;
    } else if (age < 2) {
      ret.min = 11;
      ret.max = 14;
    } else if (age < 5) {
      ret.min = 10;
      ret.max = 13;
    } else if (age < 12) {
      ret.min = 9;
      ret.max = 12;
    } else if (age < 18) {
      ret.min = 9;
      ret.max = 10;
    } else if (age < 64) {
      ret.min = 7;
      ret.max = 9;
    } else {
      ret.min = 7;
      ret.max = 8;
    }
    return {
      min: ret.min * 60,
      max: ret.max * 60
    };
  }

  $: disabledButton = !inputedTime || userAge === 0;

  function wakeUpTime(sleepTime: Date) {
    let mintues = optimalSleepMinutes(userAge);
    let numCycles = {
      min: Math.ceil(mintues.min / cycleLength),
      max: Math.ceil(mintues.max / cycleLength)
    };

    let ret = [];
    for (let cycles = numCycles.min; cycles <= numCycles.max; cycles++) {
      let time = new Date(sleepTime.getTime());
      time.setMinutes(time.getMinutes() + cycles * cycleLength);
      ret.push(time);
    }
    return ret;
  }

  function sleepTime(wakeUpTime: Date) {
    let mintues = optimalSleepMinutes(userAge);
    let numCycles = {
      min: Math.ceil(mintues.min / cycleLength),
      max: Math.ceil(mintues.max / cycleLength)
    };

    let ret = [];
    for (let cycles = numCycles.min; cycles <= numCycles.max; cycles++) {
      let time = new Date(wakeUpTime.getTime());
      time.setMinutes(time.getMinutes() - cycles * cycleLength);
      ret.push(time);
    }
    return ret;
  }

  let results: Array<Date> | null = null;
  function calculate() {
    let [hour, minute] = inputedTime.split(':').map(x => parseInt(x));
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === 'pm') {
      hour += 12;
    }
    if (dropdownId === 'sleep') {
      let sleepTime = new Date();
      sleepTime.setHours(hour);
      sleepTime.setMinutes(minute);

      results = wakeUpTime(sleepTime);
    } else {
      let wakeUpTime = new Date();
      wakeUpTime.setHours(hour);
      wakeUpTime.setMinutes(minute);

      results = sleepTime(wakeUpTime);
    }
  }
</script>

<div class="flex h-screen">
  <div class="m-auto">
    <!--come up with a better name-->
    <h1 class="my-5">Sleep Calculator</h1>

    <div class="my-3">
      <NumberInput
        min={1}
        max={120}
        invalidText="Number must be between 1 and 120."
        label="Age"
        bind:value={userAge}
      />
    </div>

    <div class="flex flex-row space-x-3">
      <!--todo: set fixed width-->
      <div>
        <Dropdown
          bind:selectedId={dropdownId}
          items={[
            {id: 'sleep', text: 'I want to sleep at...'},
            {id: 'wake', text: 'I want to wake up at...'}
          ]}
        />
      </div>

      <div>
        <!---todo: check for valid time input-->
        <TimePicker
          class="w-full"
          hideLabel
          placeholder="hh:mm"
          invalidText="Time must be in the format hh:mm."
          bind:value={inputedTime}
        >
          <TimePickerSelect bind:value={meridiem}>
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </TimePickerSelect>
        </TimePicker>
      </div>
    </div>

    <div class="my-3">
      {#if disabledButton}
        <Button kind="secondary" disabled on:hover>Calculate</Button>
        <!---change text to red and a bit faded-->
        <p>Please complete the form to continue.</p>
      {:else}
        <Button
          kind="secondary"
          on:click={() => {
            calculate();
          }}>Calculate</Button
        >
      {/if}
    </div>

    {#if results !== null}
      <div class="my-3">
        {#if dropdownId === 'wake'}
          <h3>You should sleep at...</h3>
        {:else}
          <h3>You should wake up at...</h3>
        {/if}
        <div>
          {#each results as result}
            <p>
              {result.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </p>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
