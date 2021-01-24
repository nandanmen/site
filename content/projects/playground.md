---
path: /projects/playground
type: Personal
title: Playground
tech: [React, Web Workers, Babel, TailwindCSS]
blurb: A visual debugger for JavaScript algorithms.
github: https://github.com/narendrasss/playground
link: https://playground.narendras.vercel.app
---

Playground is an online debugger that lets you trace through JavaScript functions by adding debugger statements. It's one of my favourite personal projects because I got to use a lot of technologies that were new to me.

## Rationale

When I was building the Visualizer, I needed a way to monitor functions as they run. I messed around with a few different approaches and I eventually landed on a solution that I thought was super cool.

I was thrilled with how the final solution turned out — so much so that I wanted to showcase it *separately* from the Visualizer website. I wanted a place where users could write their own functions, debug them, and run them against whatever inputs they wanted. Hence, Playground was born.

## The Debugger

The app revolves around the `debugger` statement. Using the `debugger` statement, users can create snapshots of their functions and see the values of internal variables at any point in time.

<div class="flex items-center justify-center py-12">
  <div class="relative transform skew-y-6">
    <pre class="p-4 text-sm text-white bg-gray-800 rounded-lg"><span class="highlight">function</span> sum(numbers) {
  <span class="highlight">let</span> sum = 0;
  <span class="highlight">for</span> (<span class="highlight">const</span> num <span class="highlight">of</span> numbers) {
    sum += num;
    <span class="highlight">debugger</span>;
  }
  <span class="highlight">return</span> sum;
}</pre>
  <div class="absolute left-0 w-full h-5 transform -translate-x-4 bg-gray-100 shadow-lg opacity-10 top-24"></div>
  </div>
  <ul class="absolute space-y-2 font-mono transform translate-x-20 translate-y-20">
    <li class="flex text-sm text-gray-800 rounded-md shadow-md">
      <p class="flex-1 p-2 bg-gray-300 rounded-l-md">numbers</p>
      <p class="flex-1 p-2 bg-gray-200 rounded-r-md">[1,2,3]</p>
    </li>
    <li class="flex text-sm text-gray-800 rounded-md shadow-md">
      <p class="flex-1 p-2 bg-gray-300 rounded-l-md">num</p>
      <p class="flex-1 p-2 bg-gray-200 rounded-r-md">1</p>
    </li>
    <li class="flex text-sm text-gray-800 rounded-md shadow-md">
      <p class="flex-1 p-2 bg-gray-300 rounded-l-md">sum</p>
      <p class="flex-1 p-2 bg-gray-200 rounded-r-md">1</p>
    </li>
  </ul>
</div>

## Implementation

The logic to make this work is split in two parts — code analysis and code evaluation.

### Code Analysis

The first part is code analysis — how do you capture and expose the function's internal data? To accomplish this, I leveraged Babel's plugin APIs to modify the program source code, replacing every instance of debugger with a custom snapshot helper function.

<div class="relative flex justify-start pt-8 text-xs pb-44">
    <div class="absolute w-48 h-48 transform -translate-x-1/2 bg-blue-700 rounded-full left-1/2 top-4"></div>
    <div class="transform -skew-y-6">
      <pre class="p-4 text-white bg-gray-800 rounded-lg"><span class="highlight">for</span> (<span class="highlight">const</span> num <span class="highlight">of</span> numbers) {
  sum += num;
  <span class="highlight">debugger</span>;
}</pre>
    </div>
    <div class="absolute right-0 transform skew-y-6 top-24">
      <pre class="p-4 text-gray-700 bg-gray-100 rounded-lg shadow-md"><span class="text-blue-700">for</span> (<span class="text-blue-700">const</span> num <span class="text-blue-700">of</span> numbers) {
  sum += num;
  <span class="text-blue-700">snapshot</span>({
    sum,
    num,
    numbers
  });
}</pre>
    </div>
  </div>

### Code Evaluation

After modifying the source, the next step is to evaluate the code. In Playground, the code evaluation is done off the main thread using a web worker. This means the evaluation process doesn't block the user from interacting with the app! It also allows for features such as timeouts to prevent code from running indefinitely.

## Takeaways

My biggest takeaway from this project was the power of web workers — how they can be used to offload expensive computations and improve the overall user experience of the app. It was also interesting to see how Babel works under the hood, by using their lower-level APIs myself. All in all, this project was a fun exercise in using some lesser-known web technologies to solve real problems.
