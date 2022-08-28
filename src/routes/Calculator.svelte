<script lang="ts">
  import {
    Dropdown,
    TimePicker,
    TimePickerSelect,
    SelectItem,
    Button,
    NumberInput,
    Slider
  } from 'carbon-components-svelte';
  import 'carbon-components-svelte/css/all.css';

  import {
    userAge,
    cycleLength,
    dropdownId,
    userData,
    recommendedTimes
  } from './stores';
  import {findCycleLength} from './algorithm';
  import {get} from 'svelte/store';

  let inputedTime1 = '12:00';
  let meridiem1 = 'am';

  let inputedTime2 = '12:00';
  let meridiem2 = 'am';

  function optimalSleepMinutes(age: number) {
    let min, max;
    if (age < 1) {
      min = 12;
      max = 16;
    } else if (age < 2) {
      min = 11;
      max = 14;
    } else if (age < 5) {
      min = 10;
      max = 13;
    } else if (age < 12) {
      min = 9;
      max = 12;
    } else if (age < 18) {
      min = 9;
      max = 10;
    } else if (age < 64) {
      min = 7;
      max = 9;
    } else {
      min = 7;
      max = 8;
    }
    return {
      min: min * 60,
      max: max * 60
    };
  }

  $: disabledButton = !inputedTime1 || $userAge === 0;

  function wakeUpTime(sleepTime: Date) {
    let mintues = optimalSleepMinutes(get(userAge));
    let numCycles = {
      min: Math.ceil(mintues.min / get(cycleLength)),
      max: Math.ceil(mintues.max / get(cycleLength))
    };

    let ret = [];
    for (let cycles = numCycles.min; cycles <= numCycles.max; cycles++) {
      let time = new Date(sleepTime.getTime());
      time.setMinutes(time.getMinutes() + cycles * get(cycleLength));
      ret.push(time);
    }
    return ret;
  }

  function sleepTime(wakeUpTime: Date) {
    let mintues = optimalSleepMinutes(get(userAge));
    let numCycles = {
      min: Math.ceil(mintues.min / get(cycleLength)),
      max: Math.ceil(mintues.max / get(cycleLength))
    };

    let ret = [];
    for (let cycles = numCycles.min; cycles <= numCycles.max; cycles++) {
      let time = new Date(wakeUpTime.getTime());
      time.setMinutes(time.getMinutes() - cycles * get(cycleLength));
      ret.push(time);
    }
    return ret;
  }

  function updateUserData(minutesSlept: number, rating: number) {
    userData.set([
      {
        minutes: minutesSlept,
        rating: rating
      },
      ...get(userData)
    ]);
    userAge.set(findCycleLength(get(userData)));
  }

  function calculate() {
    let [hour, minute] = inputedTime1.split(':').map(x => parseInt(x));
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem1 === 'pm') {
      hour += 12;
    }
    if (get(dropdownId) === 'sleep') {
      let sleepTime = new Date();
      sleepTime.setHours(hour);
      sleepTime.setMinutes(minute);

      recommendedTimes.set(
        wakeUpTime(sleepTime).map(x => {
          return x.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
        })
      );
    } else {
      let wakeUpTime = new Date();
      wakeUpTime.setHours(hour);
      wakeUpTime.setMinutes(minute);

      recommendedTimes.set(
        sleepTime(wakeUpTime).map(x => {
          return x.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
        })
      );
    }
  }

  let rating: number;
  function submitRating() {
    function getDate(inputedTime: string, meridiem: string) {
      let [hour, minute] = inputedTime.split(':').map(x => parseInt(x));
      if (hour === 12) {
        hour = 0;
      }
      if (meridiem === 'pm') {
        hour += 12;
      }
      let time = new Date();
      time.setHours(hour);
      time.setMinutes(minute);
      return time;
    }

    let sleepTime = getDate(inputedTime1, meridiem1);
    let wakeUpTime = getDate(inputedTime2, meridiem2);
    wakeUpTime.setDate(sleepTime.getDate() + 1);
    console.log(sleepTime, wakeUpTime);

    let minutesSlept = (wakeUpTime.getTime() - sleepTime.getTime()) / 60000;
    updateUserData(minutesSlept, rating);

    recommendedTimes.set([]);
  }
</script>

<div class="flex h-screen">
  <div class="m-auto">
    <!--come up with a better name-->
    <h1 class="my-5">Sleep Calculator</h1>

    {#if !$recommendedTimes.length}
      <!--form-->
      <div class="my-3">
        <NumberInput
          min={1}
          max={120}
          invalidText="Number must be between 1 and 120."
          label="Age"
          bind:value={$userAge}
        />
      </div>

      <div class="flex flex-row space-x-3">
        <!--todo: set fixed width-->
        <div>
          <Dropdown
            bind:selectedId={$dropdownId}
            items={[
              {id: 'sleep', text: 'I want to sleep at...'},
              {id: 'wake up', text: 'I want to wake up at...'}
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
            bind:value={inputedTime1}
          >
            <TimePickerSelect bind:value={meridiem1}>
              <SelectItem value="am" text="AM" />
              <SelectItem value="pm" text="PM" />
            </TimePickerSelect>
          </TimePicker>
        </div>
      </div>

      <div class="my-3">
        {#if disabledButton}
          <Button kind="secondary" disabled>Calculate</Button>
          <!---change text to red and a bit faded-->
          <p>Please complete the form to continue.</p>
        {:else}
          <Button kind="secondary" on:click={calculate}>Calculate</Button>
        {/if}
        <!--disabledButton-->
      </div>
    {:else}
      <div class="space-y-4">
        <p>If you want to {$dropdownId} at {inputedTime1}{meridiem1},</p>

        <div>
          {#if $dropdownId === 'wake up'}
            <p>You should sleep at...</p>
          {:else}
            <p>You should wake up at...</p>
          {/if}
          <div>
            {#each $recommendedTimes as result}
              <p>{result}</p>
            {/each}
          </div>
        </div>

        <div>
          {#if $dropdownId === 'wake up'}
            <p>When did you sleep?</p>
          {:else}
            <p>When did you wake up?</p>
          {/if}
          <TimePicker
            class="w-full"
            hideLabel
            placeholder="hh:mm"
            invalidText="Time must be in the format hh:mm."
            bind:value={inputedTime2}
          >
            <TimePickerSelect bind:value={meridiem2}>
              <SelectItem value="am" text="AM" />
              <SelectItem value="pm" text="PM" />
            </TimePickerSelect>
          </TimePicker>
        </div>
        <div>
          <p>How well did you sleep?</p>
          <Slider
            minLabel="😭"
            maxLabel="😃"
            min={1}
            max={10}
            hideTextInput
            label="How did you sleep?"
            bind:value={rating}
          />
        </div>

        <div class="space-x-4">
          <Button
            kind="tertiary"
            on:click={() => {
              recommendedTimes.set([]);
            }}>Go Back</Button
          >
          <Button kind="secondary" on:click={submitRating}>Submit</Button>
        </div>
      </div>
    {/if}
  </div>
</div>
