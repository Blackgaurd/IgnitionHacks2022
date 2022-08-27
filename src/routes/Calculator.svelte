<script lang="ts">
  import {
    Dropdown,
    TimePicker,
    TimePickerSelect,
    SelectItem,
    Button
  } from 'carbon-components-svelte';
  import 'carbon-components-svelte/css/all.css';
</script>

<div class="flex h-screen">
  <div class="m-auto">
    <!--come up with a better name-->
    <h1 class="my-5">Sleep Calculator</h1>

    <div class="flex flex-row space-x-4">
      <div>
        <Dropdown
          selectedId="sleep"
          items={[
            {id: 'sleep', text: 'I want to sleep at...'},
            {id: 'wake', text: 'I want to wake up at...'}
          ]}
        />
      </div>

      <div>
        <TimePicker
          hideLabel
          placeholder="hh:mm"
          invalidText="A valid value is required"
        >
          <TimePickerSelect value="pm">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </TimePickerSelect>
        </TimePicker>
      </div>
    </div>

    <div class="my-3">
      <Button kind="secondary">Calculate</Button>
    </div>
  </div>
</div>
